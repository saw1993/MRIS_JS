import 'package:mobile/core/resources/data_state.dart';

import '../../../../features/doctorlist/data/models/doctor_model.dart';

abstract class DoctorRepository {
  Future<DataState<List<DoctorModel>>> getDoctors();
  Future<DataState<List<DoctorModel>>> syncDoctors();
}
