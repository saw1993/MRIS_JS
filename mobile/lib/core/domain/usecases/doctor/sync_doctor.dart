
import 'package:mobile/core/domain/repository/doctor/doctor_repository.dart';

class SyncDoctors {
  final DoctorRepository doctorRepository;

  SyncDoctors(this.doctorRepository);

  Future<void> execute() async {
    await doctorRepository.syncDoctors();
  }
}
