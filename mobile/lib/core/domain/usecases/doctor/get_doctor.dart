import 'package:mobile/core/resources/data_state.dart';
import 'package:mobile/features/doctorlist/data/models/doctor_model.dart';
import 'package:mobile/core/domain/repository/doctor/doctor_repository.dart';

class GetDoctorsUseCase {
  final DoctorRepository _doctorRepository;

  GetDoctorsUseCase(this._doctorRepository);

  Future<DataState<List<DoctorModel>>> execute() async {
    return _doctorRepository.getDoctors();
  }
}
