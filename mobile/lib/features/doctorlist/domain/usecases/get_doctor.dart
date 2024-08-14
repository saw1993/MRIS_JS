import 'package:mobile/core/resources/data_state.dart';
import 'package:mobile/core/usecases/usecase.dart';
import 'package:mobile/features/doctorlist/data/models/doctor.dart';
import 'package:mobile/features/doctorlist/domain/repository/doctor_repository.dart';

class GetDoctorsUseCase implements UseCase<DataState<List<DoctorModel>>, void> {
  final DoctorRepository _doctorRepository;

  GetDoctorsUseCase(this._doctorRepository);

  @override
  Future<DataState<List<DoctorModel>>> call({void params}) {
    return _doctorRepository.getDoctors();
  }
}
