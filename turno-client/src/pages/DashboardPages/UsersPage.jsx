import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DataGrid } from '@mui/x-data-grid';
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../../services/UserService';

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  type: 'editor',
  username: '',
  password: '',
  address: '',
  isActive: true,
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const currentType = localStorage.getItem('type');

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    role: 'all',
    gender: 'all',
    status: 'all',
  });

  const loadUsers = async () => {
    setLoading(true);
    setLoadError('');
    try {
      const { data } = await fetchUsers();
      const list = (data.users || []).map((u) => ({ ...u, id: u._id }));
      setUsers(list);
    } catch (err) {
      setLoadError(err.response?.data?.message || 'Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentType === 'admin') loadUsers();
  }, [currentType]);

  if (currentType !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  const resetForm = () => {
    setForm({ ...blankForm });
    setErrors({});
  };

  const openModal = (user) => {
    setModal({ open: true, id: user?._id ?? null });
    setForm(user ? { ...blankForm, ...user, password: '' } : { ...blankForm });
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setShowPassword(false);
    resetForm();
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const nextErrors = {};

    [
      ['firstName', 'First name'],
      ['lastName', 'Last name'],
      ['age', 'Age'],
      ['gender', 'Gender'],
      ['contactNumber', 'Contact number'],
      ['email', 'Email'],
      ['type', 'Role'],
      ['username', 'Username'],
      ['address', 'Address'],
    ].forEach(([key, label]) => {
      if (!String(form[key] ?? '').trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    if (!nextErrors.age && !/^\d+$/.test(String(form.age).trim())) {
      nextErrors.age = 'Age must be a number only.';
    }

    if (!nextErrors.contactNumber && !/^\d{11}$/.test(String(form.contactNumber).trim())) {
      nextErrors.contactNumber = 'Contact number must be 11 digits.';
    }

    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim().toLowerCase())) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!nextErrors.username && /\s/.test(form.username.trim())) {
      nextErrors.username = 'Username must not contain spaces.';
    }

    if (!modal.id && !form.password) {
      nextErrors.password = 'Password is required for new users.';
    } else if (form.password && form.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.';
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const payload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: String(form.age).trim(),
      gender: form.gender.trim().toLowerCase(),
      contactNumber: form.contactNumber.trim(),
      email: form.email.trim().toLowerCase(),
      type: form.type.trim().toLowerCase(),
      username: form.username.trim().toLowerCase(),
      address: form.address.trim(),
      isActive: !!form.isActive,
    };
    if (form.password) payload.password = form.password;

    try {
      if (modal.id) {
        await updateUser(modal.id, payload);
      } else {
        await createUser(payload);
      }
      await loadUsers();
      closeModal();
    } catch (err) {
      setErrors({ _form: err.response?.data?.message || 'Save failed.' });
    }
  };

  const toggleStatus = async (user) => {
    try {
      await updateUser(user._id, { isActive: !user.isActive });
      await loadUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const removeUser = async (id) => {
    try {
      await deleteUser(id);
      await loadUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      (user.firstName || '').toLowerCase().includes(searchLower) ||
      (user.lastName || '').toLowerCase().includes(searchLower) ||
      (user.email || '').toLowerCase().includes(searchLower) ||
      (user.username || '').toLowerCase().includes(searchLower);

    const matchesRole = filters.role === 'all' || user.type === filters.role;
    const matchesGender = filters.gender === 'all' || user.gender === filters.gender;
    const matchesStatus =
      filters.status === 'all' ||
      (filters.status === 'active' && user.isActive) ||
      (filters.status === 'inactive' && !user.isActive);

    return matchesSearch && matchesRole && matchesGender && matchesStatus;
  });

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name] ?? '',
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    ...extra,
  });

  const columns = [
    {
      field: 'fullName',
      headerName: 'Full Name',
      flex: 1,
      minWidth: 170,
      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`.trim(),
    },
    { field: 'username', headerName: 'Username', minWidth: 150 },
    { field: 'age', headerName: 'Age', width: 90 },
    {
      field: 'gender',
      headerName: 'Gender',
      minWidth: 110,
      valueGetter: (_, row) => labelize(row.gender),
    },
    { field: 'contactNumber', headerName: 'Contact Number', minWidth: 160 },
    { field: 'email', headerName: 'Email', flex: 1.1, minWidth: 220 },
    {
      field: 'type',
      headerName: 'Role',
      minWidth: 120,
      valueGetter: (_, row) => labelize(row.type),
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 120,
      sortable: false,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.isActive ? 'Active' : 'Inactive'}
          color={row.isActive ? 'success' : 'default'}
          variant={row.isActive ? 'filled' : 'outlined'}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 260,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
          <Button size="small" variant="outlined" onClick={() => openModal(row)}>
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={row.isActive ? 'warning' : 'success'}
            onClick={() => toggleStatus(row)}
          >
            {row.isActive ? 'Disable' : 'Activate'}
          </Button>
          <Button size="small" variant="contained" color="error" onClick={() => removeUser(row._id)}>
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="h4">Users</Typography>
        <Stack direction="row" spacing={2} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          <Button variant="contained" onClick={() => openModal()} fullWidth={isMobile}>
            Add User
          </Button>
        </Stack>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            label="Search by name, email, or username"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
          <TextField
            select
            label="Role"
            size="small"
            value={filters.role}
            onChange={(e) => setFilters((prev) => ({ ...prev, role: e.target.value }))}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="all">All Roles</MenuItem>
            {roles.map((role) => (
              <MenuItem key={role} value={role}>{labelize(role)}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Gender"
            size="small"
            value={filters.gender}
            onChange={(e) => setFilters((prev) => ({ ...prev, gender: e.target.value }))}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="all">All Genders</MenuItem>
            {genders.map((gender) => (
              <MenuItem key={gender} value={gender}>{labelize(gender)}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Status"
            size="small"
            value={filters.status}
            onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>
        </Stack>
      </Paper>

      {loadError ? (
        <Alert severity="error" sx={{ mb: 2 }}>{loadError}</Alert>
      ) : null}

      <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: 'hidden' }}>
        <Box sx={{ height: { xs: 460, sm: 520 }, width: '100%', minWidth: 0 }}>
          <DataGrid
            rows={filteredUsers}
            columns={columns}
            loading={loading}
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10, 25]}
            initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
            sx={{
              minWidth: 0,
              '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': { outline: 'none' },
            }}
          />
        </Box>
      </Paper>

      <Dialog open={modal.open} onClose={closeModal} fullWidth fullScreen={isMobile} maxWidth="md">
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{modal.id ? 'Edit User' : 'Add User'}</DialogTitle>
          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
            {errors._form && <Alert severity="error" sx={{ mb: 2 }}>{errors._form}</Alert>}
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('firstName', 'First Name')} />
                <TextField {...fieldProps('lastName', 'Last Name')} />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('age', 'Age')} />
                <TextField {...fieldProps('gender', 'Gender', { select: true })}>
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>{labelize(gender)}</MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('contactNumber', 'Contact Number')} />
                <TextField {...fieldProps('email', 'Email Address', { type: 'email' })} />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('type', 'Role', { select: true })}>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>{labelize(role)}</MenuItem>
                  ))}
                </TextField>
                <TextField {...fieldProps('username', 'Username')} />
              </Stack>
              <TextField
                {...fieldProps('password', modal.id ? 'Password (leave blank to keep current)' : 'Password', {
                  type: showPassword ? 'text' : 'password',
                  slotProps: {
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setShowPassword((prev) => !prev)}
                            onMouseDown={(event) => event.preventDefault()}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  },
                })}
              />
              <TextField {...fieldProps('address', 'Address', { multiline: true, rows: 3 })} />
              <FormControlLabel
                control={<Switch name="isActive" checked={!!form.isActive} onChange={handleChange} />}
                label={form.isActive ? 'User status: Active' : 'User status: Inactive'}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained">
              {modal.id ? 'Save Changes' : 'Add User'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UsersPage;
