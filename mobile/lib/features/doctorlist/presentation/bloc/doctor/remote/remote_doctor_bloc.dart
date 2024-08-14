import 'package:bloc/bloc.dart';
import 'package:mobile/core/resources/data_state.dart';
import 'package:mobile/features/doctorlist/domain/usecases/get_doctor.dart';
import 'package:mobile/features/doctorlist/presentation/bloc/doctor/remote/remote_doctor_event.dart';
import 'package:mobile/features/doctorlist/presentation/bloc/doctor/remote/remote_doctor_state.dart';

class RemoteDoctorBloc extends Bloc<RemoteDoctorEvent, RemoteDoctorState> {
  final GetDoctorsUseCase _getDoctorsUseCase;

  RemoteDoctorBloc(this._getDoctorsUseCase)
      : super(const RemoteDoctorLoading()) {
    on<GetDoctors>(onGetDoctors);
  }

  void onGetDoctors(GetDoctors event, Emitter<RemoteDoctorState> emit) async {
    final dataState = await _getDoctorsUseCase();

    if (dataState is DataSuccess && dataState.data!.isNotEmpty) {
      emit(RemoteDoctorDone(dataState.data!));
    }

    if (dataState is DataFailed) {
      emit(RemoteDoctorError(dataState.error!));
    }
  }
}
