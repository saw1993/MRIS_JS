import React, { useState, useEffect } from 'react';
import { getSpecialities, addDoctor , getCategories} from '../../core/services/doctorServices.js';
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
  Alert
} from '@mui/material';

const AddDoctor = ({ open, onClose, onSubmit }) => {
  const [doctor, setDoctor] = useState({
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
  });

  const [errors, setErrors] = useState({});
  const [specialities, setSpecialities] = useState([]);
  const [towns, setTowns] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch specialities, towns, and routes when the component mounts
  useEffect(() => {
    const fetchSpecialities = async () => {
      try {
        const specialitiesData = await getSpecialities();
        setSpecialities(specialitiesData);
      } catch (error) {
        console.error('Failed to fetch specialities:', error);
      }
    };

    const fetchTowns = async () => {
      try {
        const townsData = await getTowns();
        setTowns(townsData);
      } catch (error) {
        console.error('Failed to fetch towns:', error);
      }
    };

    const fetchRoutes = async () => {
      try {
        const routesData = await getRoutes();
        setRoutes(routesData);
      } catch (error) {
        console.error('Failed to fetch routes:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories(); // Fetch categories
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchSpecialities();
    fetchTowns();
    fetchRoutes();
    fetchCategories();

  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error message on change
  };

  const validate = () => {
    const newErrors = {};
    if (!doctor.name) newErrors.name = 'Name is required';
    if (!doctor.telephone) newErrors.telephone = 'Telephone is required';
    if (!doctor.email) newErrors.email = 'Email is required';
    if (!doctor.slmc_no) newErrors.slmc_no = 'SLMC No is required';
    if (!doctor.birthday) newErrors.birthday = 'Birthday is required';
    if (!doctor.category_id) newErrors.category_id = 'Category is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async () => {
    try {
      // Call the API to add the doctor (this will validate data internally)
      await addDoctor(doctor);
  
      // If successful, reset form and show success message
      setSuccessMessage('Doctor added successfully!');
      setErrorMessage(''); // Clear error messages if any
      setDoctor({
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
        category_id: '' // reset the category_id as well
      });
  
      setSuccessMessage('');
      onSubmit(); // Trigger the onSubmit prop callback if needed
      onClose(); // Close the modal
    } catch (error) {
      // If there's a validation error or API failure, display the message
      setSuccessMessage('');
      setErrorMessage(error.message || 'Failed to add doctor. Please try again.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Doctor</DialogTitle>
      <DialogContent>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          value={doctor.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          margin="dense"
          name="telephone"
          label="Telephone"
          type="tel"
          fullWidth
          variant="outlined"
          value={doctor.telephone}
          onChange={handleChange}
          error={!!errors.telephone}
          helperText={errors.telephone}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          value={doctor.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          margin="dense"
          name="slmc_no"
          label="SLMC No"
          type="text"
          fullWidth
          variant="outlined"
          value={doctor.slmc_no}
          onChange={handleChange}
          error={!!errors.slmc_no}
          helperText={errors.slmc_no}
        />
        <TextField
          margin="dense"
          name="birthday"
          label="Birthday"
          type="date"
          fullWidth
          variant="outlined"
          value={doctor.birthday}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          error={!!errors.birthday}
          helperText={errors.birthday}
        />
        <TextField
          margin="dense"
          name="remarks"
          label="Remarks"
          type="text"
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          value={doctor.remarks}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="frequency"
          label="Frequency"
          type="number"
          fullWidth
          variant="outlined"
          value={doctor.frequency}
          onChange={handleChange}
        />

        {/* Dropdown for Speciality */}
        <FormControl fullWidth margin="dense" variant="outlined" error={!!errors.speciality_id}>
          <InputLabel id="speciality-label">Speciality</InputLabel>
          <Select
            labelId="speciality-label"
            name="speciality_id"
            value={doctor.speciality_id}
            onChange={handleChange}
            label="Speciality"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {specialities.map((speciality) => (
              <MenuItem key={speciality.speciality_id} value={speciality.speciality_id}>
                {speciality.speciality_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>


        {/* Dropdown for Cateogruy */}
        <FormControl fullWidth margin="dense" variant="outlined" error={!!errors.category_id}>
          <InputLabel id="categroy-label">Category</InputLabel>
          <Select
            labelId="category-label"
            name="category_id"
            value={doctor.category_id}
            onChange={handleChange}
            label="Category"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.category_id} value={category.category_id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Dropdown for Town */}
        <FormControl fullWidth margin="dense" variant="outlined" error={!!errors.town_id}>
          <InputLabel id="town-label">Town</InputLabel>
          <Select
            labelId="town-label"
            name="town_id"
            value={doctor.town_id}
            onChange={handleChange}
            label="Town"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {towns.map((town) => (
              <MenuItem key={town.town_id} value={town.town_id}>
                {town.town_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Dropdown for Route */}
        <FormControl fullWidth margin="dense" variant="outlined" error={!!errors.route_id}>
          <InputLabel id="route-label">Route</InputLabel>
          <Select
            labelId="route-label"
            name="route_id"
            value={doctor.route_id}
            onChange={handleChange}
            label="Route"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {routes.map((route) => (
              <MenuItem key={route.route_id} value={route.route_id}>
                {route.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add Doctor
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDoctor;