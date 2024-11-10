import React, { useEffect, useState } from 'react';
import { getSpecialities, addDoctor, getCategories } from '../../core/services/doctorServices.js';
import { getTowns, getRoutes } from '../../core/services/miscServices.js';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Alert,
} from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AddDoctor = ({ open, onClose, onSubmit }) => {
  const [specialities, setSpecialities] = useState([]);
  const [towns, setTowns] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [specialitiesData, townsData, routesData, categoriesData] = await Promise.all([
          getSpecialities(),
          getTowns(),
          getRoutes(),
          getCategories(),
        ]);
        setSpecialities(specialitiesData);
        setTowns(townsData);
        setRoutes(routesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    telephone: Yup.string().required('Telephone is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    slmc_no: Yup.string().required('SLMC No is required'),
    birthday: Yup.date().required('Birthday is required'),
    category_id: Yup.string().required('Category is required'),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await addDoctor(values);
      setSuccessMessage('Doctor added successfully!');
      setErrorMessage('');
      resetForm();
      onSubmit();
      onClose();
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage(error.message || 'Failed to add doctor. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Doctor</DialogTitle>
      <DialogContent>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <Formik
          initialValues={{
            name: '',
            telephone: '',
            email: '',
            slmc_no: '',
            birthday: '',
            remarks: '',
            frequency: 1,
            speciality_id: '',
            town_id: '',
            route_id: '',
            category_id: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field name="name">
                {({ field }) => (
                  <TextField {...field} label="Name" fullWidth margin="dense" variant="outlined" />
                )}
              </Field>
              <ErrorMessage name="name" component="div" style={{ color: 'red' }} />

              <Field name="telephone">
                {({ field }) => (
                  <TextField {...field} label="Telephone" fullWidth margin="dense" variant="outlined" />
                )}
              </Field>
              <ErrorMessage name="telephone" component="div" style={{ color: 'red' }} />

              <Field name="email">
                {({ field }) => (
                  <TextField {...field} label="Email" fullWidth margin="dense" variant="outlined" />
                )}
              </Field>
              <ErrorMessage name="email" component="div" style={{ color: 'red' }} />

              <Field name="slmc_no">
                {({ field }) => (
                  <TextField {...field} label="SLMC No" fullWidth margin="dense" variant="outlined" />
                )}
              </Field>
              <ErrorMessage name="slmc_no" component="div" style={{ color: 'red' }} />

              <Field name="birthday">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Birthday"
                    type="date"
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              </Field>
              <ErrorMessage name="birthday" component="div" style={{ color: 'red' }} />

              <Field name="remarks">
                {({ field }) => (
                  <TextField {...field} label="Remarks" multiline rows={4} fullWidth margin="dense" variant="outlined" />
                )}
              </Field>

              <Field name="frequency">
                {({ field }) => (
                  <TextField {...field} label="Frequency" type="number" fullWidth margin="dense" variant="outlined" />
                )}
              </Field>

              <FormControl fullWidth margin="dense" variant="outlined">
                <InputLabel id="speciality-label">Speciality</InputLabel>
                <Field name="speciality_id" as={Select} label="Speciality" labelId="speciality-label">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {specialities.map((speciality) => (
                    <MenuItem key={speciality.speciality_id} value={speciality.speciality_id}>
                      {speciality.speciality_name}
                    </MenuItem>
                  ))}
                </Field>
              </FormControl>

              <FormControl fullWidth margin="dense" variant="outlined">
                <InputLabel id="category-label">Category</InputLabel>
                <Field name="category_id" as={Select} label="Category" labelId="category-label">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.category_id} value={category.category_id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Field>
              </FormControl>

              <FormControl fullWidth margin="dense" variant="outlined">
                <InputLabel id="town-label">Town</InputLabel>
                <Field name="town_id" as={Select} label="Town" labelId="town-label">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {towns.map((town) => (
                    <MenuItem key={town.town_id} value={town.town_id}>
                      {town.town_name}
                    </MenuItem>
                  ))}
                </Field>
              </FormControl>

              <FormControl fullWidth margin="dense" variant="outlined">
                <InputLabel id="route-label">Route</InputLabel>
                <Field name="route_id" as={Select} label="Route" labelId="route-label">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {routes.map((route) => (
                    <MenuItem key={route.route_id} value={route.route_id}>
                      {route.name}
                    </MenuItem>
                  ))}
                </Field>
              </FormControl>

              <DialogActions>
                <Button onClick={onClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary" disabled={isSubmitting}>
                  Add Doctor
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddDoctor;