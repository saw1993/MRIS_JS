export const validateDoctorData = (doctorData) => {
    const errors = [];
  
    if (!doctorData.name || typeof doctorData.name !== 'string') {
      errors.push('Name is required and must be a string.');
    }
  
    if (!doctorData.category_id || typeof doctorData.category_id !== 'number') {
      errors.push('Category ID is required and must be a number.');
    }
  
   /* if (doctorData.telephone && typeof doctorData.telephone.length < 10) {
      errors.push('Telephone must be a number.');
    } 
  
    if (doctorData.email && typeof doctorData.email !== 'string') {
      errors.push('Email must be a string.');
    }
  
    if (doctorData.slmc_no && typeof doctorData.slmc_no !== 'number') {
      errors.push('SLMC No must be a number.');
    }
  
    if (doctorData.birthday && !/^\d{4}-\d{2}-\d{2}$/.test(doctorData.birthday)) {
      errors.push('Birthday must be in the format YYYY-MM-DD.');
    }
      */
  
    if (typeof doctorData.frequency !== 'number') {
      errors.push('Frequency is required and must be a number.');
    }
  
    if (!doctorData.speciality_id || typeof doctorData.speciality_id !== 'number') {
      errors.push('Speciality ID is required and must be a number.');
    }
  
    if (errors.length > 0) {
      throw new Error(errors.join(' '));
    }
  };