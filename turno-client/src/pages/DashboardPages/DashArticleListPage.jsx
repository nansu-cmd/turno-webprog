import { useEffect, useState } from 'react';
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
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import {
  fetchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from '../../services/ArticleService';

const blankForm = {
  slug: '',
  title: '',
  imageUrl: '',
  paragraphs: '',
  isActive: true,
};

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const DashArticleListPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const loadArticles = async () => {
    setLoading(true);
    setLoadError('');
    try {
      const { data } = await fetchArticles();
      const list = (data.articles || []).map((a) => ({ ...a, id: a._id }));
      setArticles(list);
    } catch (err) {
      setLoadError(err.response?.data?.message || 'Failed to load articles.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const openModal = (article) => {
    setModal({ open: true, id: article?._id ?? null });
    setForm(
      article
        ? {
            slug: article.slug || '',
            title: article.title || '',
            imageUrl: article.imageUrl || '',
            paragraphs: (article.paragraphs || []).join('\n\n'),
            isActive: typeof article.isActive === 'boolean' ? article.isActive : true,
          }
        : { ...blankForm }
    );
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setForm({ ...blankForm });
    setErrors({});
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = 'Title is required.';
    if (!form.slug.trim()) next.slug = 'Slug is required.';
    if (!form.paragraphs.trim()) next.paragraphs = 'Paragraphs are required.';
    return next;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const next = validate();
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }

    const payload = {
      slug: slugify(form.slug),
      title: form.title.trim(),
      imageUrl: form.imageUrl.trim(),
      paragraphs: form.paragraphs
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean),
      isActive: !!form.isActive,
    };

    try {
      if (modal.id) {
        await updateArticle(modal.id, payload);
      } else {
        await createArticle(payload);
      }
      await loadArticles();
      closeModal();
    } catch (err) {
      setErrors({ _form: err.response?.data?.message || 'Save failed.' });
    }
  };

  const toggleStatus = async (article) => {
    try {
      await updateArticle(article._id, { isActive: !article.isActive });
      await loadArticles();
    } catch (err) {
      console.error(err);
    }
  };

  const removeArticle = async (id) => {
    try {
      await deleteArticle(id);
      await loadArticles();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = articles.filter((a) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      !term ||
      (a.title || '').toLowerCase().includes(term) ||
      (a.slug || '').toLowerCase().includes(term);
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && a.isActive) ||
      (statusFilter === 'inactive' && !a.isActive);
    return matchesSearch && matchesStatus;
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
    { field: 'slug', headerName: 'Slug', minWidth: 140, flex: 0.6 },
    { field: 'title', headerName: 'Title', minWidth: 200, flex: 1 },
    {
      field: 'paragraphs',
      headerName: 'Paragraphs',
      width: 120,
      valueGetter: (_, row) => (row.paragraphs?.length ?? 0),
    },
    {
      field: 'preview',
      headerName: 'Preview',
      flex: 1.2,
      minWidth: 240,
      valueGetter: (_, row) => (row.paragraphs?.[0] || '').slice(0, 80),
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
            {row.isActive ? 'Disable' : 'Enable'}
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={() => removeArticle(row._id)}
          >
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
        <Typography variant="h4">Articles</Typography>
        <Button variant="contained" onClick={() => openModal()} fullWidth={isMobile}>
          Add Article
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            label="Search Articles"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
          <TextField
            select
            label="Status Filter"
            size="small"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ minWidth: 160 }}
          >
            <MenuItem value="all">All Statuses</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>
        </Stack>
      </Paper>

      {loadError ? <Alert severity="error" sx={{ mb: 2 }}>{loadError}</Alert> : null}

      <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: 'hidden' }}>
        <Box sx={{ height: { xs: 460, sm: 520 }, width: '100%', minWidth: 0 }}>
          <DataGrid
            rows={filtered}
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
          <DialogTitle>{modal.id ? 'Edit Article' : 'Add Article'}</DialogTitle>
          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
            {errors._form && <Alert severity="error" sx={{ mb: 2 }}>{errors._form}</Alert>}
            <Stack spacing={2} sx={{ pt: 1 }}>
              <TextField {...fieldProps('title', 'Title')} />
              <TextField
                {...fieldProps('slug', 'Slug', {
                  helperText:
                    errors.slug || 'Lowercase, hyphen-separated identifier (used in URL).',
                })}
              />
              <TextField {...fieldProps('imageUrl', 'Image URL')} />
              <TextField
                {...fieldProps('paragraphs', 'Paragraphs', {
                  multiline: true,
                  rows: 6,
                  helperText:
                    errors.paragraphs ||
                    'Separate paragraphs with a blank line.',
                })}
              />
              <FormControlLabel
                control={<Switch name="isActive" checked={!!form.isActive} onChange={handleChange} />}
                label={form.isActive ? 'Status: Active' : 'Status: Inactive'}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained">
              {modal.id ? 'Save Changes' : 'Add Article'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default DashArticleListPage;
