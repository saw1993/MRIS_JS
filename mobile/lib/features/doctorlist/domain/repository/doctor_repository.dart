import 'package:mobile/core/resources/data_state.dart';

import '../../data/models/doctor.dart';

abstract class DoctorRepository {
  Future<DataState<List<DoctorModel>>> getDoctors();
}
