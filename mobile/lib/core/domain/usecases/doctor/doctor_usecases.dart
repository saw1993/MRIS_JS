import 'package:mobile/core/domain/usecases/doctor/sync_doctor.dart';
import 'package:mobile/features/doctorlist/presentation/bloc/doctor/remote/remote_doctor_event.dart';

class DoctorUseCases {
  final GetDoctors getDoctors;
  final SyncDoctors syncDoctors;

  DoctorUseCases({
    required this.getDoctors,
    required this.syncDoctors,
  });
}
