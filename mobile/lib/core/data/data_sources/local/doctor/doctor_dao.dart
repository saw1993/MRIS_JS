import 'package:floor/floor.dart';
import 'package:mobile/core/constants/tables.dart';
import 'package:mobile/features/doctorlist/data/models/doctor_model.dart';

@dao
abstract class DoctorDao {
  @Query('SELECT * FROM $doctor_table')
  Future<List<DoctorModel>> getAllDoctors();

  @Query('SELECT * FROM $doctor_table WHERE doctorId = :id')
  Future<DoctorModel?> getDoctorById(int id);

  @Insert(onConflict: OnConflictStrategy.replace)
  Future<void> insertDoctor(DoctorModel doctor);

  @Insert(onConflict: OnConflictStrategy.replace)
  Future<void> insertDoctors(List<DoctorModel> doctors);

  @Update()
  Future<void> updateDoctor(DoctorModel doctor);

  @delete
  Future<void> deleteDoctor(DoctorModel doctor);
}
