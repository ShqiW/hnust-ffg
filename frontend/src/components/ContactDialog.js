import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    TextField,
    Button,
    IconButton,
    Snackbar,
    Alert,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import axios from 'axios';
import API_URL from '../config';

function ContactDialog({ open, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        requirements: '',
        move_in_date: '',
        price_min: '',
        price_max: '',
    });
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.phone) {
            setSnackbar({ open: true, message: '请填写姓名和联系方式', severity: 'error' });
            return;
        }

        setLoading(true);
        try {
            const submitData = {
                ...formData,
                price_min: formData.price_min ? parseInt(formData.price_min) : null,
                price_max: formData.price_max ? parseInt(formData.price_max) : null,
                move_in_date: formData.move_in_date || null,
            };
            await axios.post(`${API_URL}/api/inquiries/`, submitData);
            setSnackbar({ open: true, message: '提交成功，我们会尽快联系您！', severity: 'success' });
            setFormData({
                name: '',
                phone: '',
                requirements: '',
                move_in_date: '',
                price_min: '',
                price_max: '',
            });
            setTimeout(() => onClose(), 1500);
        } catch (error) {
            console.error('提交失败:', error);
            setSnackbar({ open: true, message: '提交失败，请稍后重试', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 0 }
                }}
            >
                <DialogTitle sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #E0E0E0',
                    pb: 2,
                }}>
                    <Box sx={{ fontSize: '1.125rem', fontWeight: 500, letterSpacing: '0.1em' }}>
                        联系我们
                    </Box>
                    <IconButton onClick={onClose} size="small">
                        <Close />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ pt: 3 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
                        <TextField
                            label="姓名"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            fullWidth
                            size="small"
                            variant="outlined"
                        />
                        <TextField
                            label="联系方式"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            fullWidth
                            size="small"
                            placeholder="手机号或微信号"
                        />
                        <TextField
                            label="房子要求"
                            name="requirements"
                            value={formData.requirements}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={3}
                            size="small"
                            placeholder="如：希望有独立卫生间、靠近南校区等"
                        />
                        <TextField
                            label="期望入住时间"
                            name="move_in_date"
                            type="date"
                            value={formData.move_in_date}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                            InputLabelProps={{ shrink: true }}
                        />
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                label="价格下限"
                                name="price_min"
                                type="number"
                                value={formData.price_min}
                                onChange={handleChange}
                                fullWidth
                                size="small"
                                placeholder="元/月"
                                InputProps={{ inputProps: { min: 0 } }}
                            />
                            <TextField
                                label="价格上限"
                                name="price_max"
                                type="number"
                                value={formData.price_max}
                                onChange={handleChange}
                                fullWidth
                                size="small"
                                placeholder="元/月"
                                InputProps={{ inputProps: { min: 0 } }}
                            />
                        </Box>
                    </Box>
                </DialogContent>

                <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid #E0E0E0' }}>
                    <Button
                        onClick={onClose}
                        sx={{
                            color: '#666',
                            '&:hover': { backgroundColor: '#F5F5F5' }
                        }}
                    >
                        取消
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        sx={{
                            backgroundColor: '#000',
                            color: '#FFF',
                            px: 4,
                            '&:hover': { backgroundColor: '#333' },
                            '&:disabled': { backgroundColor: '#CCC' },
                        }}
                    >
                        {loading ? '提交中...' : '提交'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    severity={snackbar.severity}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
}

export default ContactDialog;
