import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useNavigate } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';

const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  message: yup.string().required('Message is required'),
  tags: yup.array().min(1, 'At least one tag is required'),
});

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
      message: '',
      tags: [],
      selectedFile: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (currentId === 0) {
        dispatch(createPost({ ...values, name: user?.result?.name }, navigate));
        formik.resetForm();
      } else {
        dispatch(updatePost(currentId, { ...values, name: user?.result?.name }));
        formik.resetForm();
      }
    },
  });

  const handleAddChip = (tag) => {
    formik.setFieldValue('tags', [...formik.values.tags, tag]);
  };

  const handleDeleteChip = (chipToDelete) => {
    formik.setFieldValue('tags', formik.values.tags.filter((tag) => tag !== chipToDelete));
  };

  useEffect(() => {
    if (currentId === 0) {
      formik.resetForm();
    }
  }, [currentId]);

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={formik.handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${formik.values.title}"` : 'Creating a Memory'}</Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={formik.values.message}
          onChange={formik.handleChange}
          error={formik.touched.message && Boolean(formik.errors.message)}
          helperText={formik.touched.message && formik.errors.message}
        />
        <div style={{ padding: '5px 0', width: '94%' }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={formik.values.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
            error={formik.touched.tags && Boolean(formik.errors.tags)}
            helperText={formik.touched.tags && formik.errors.tags}
          />
        </div>
        <div className={classes.fileInput}><br></br>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => formik.setFieldValue('selectedFile', base64)} />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
          Submit
        </Button>
        <Button variant="contained" color="secondary" size="small" onClick={formik.handleReset} fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;