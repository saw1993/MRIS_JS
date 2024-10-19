import 'package:dio/dio.dart';
import 'package:equatable/equatable.dart';
import 'package:mobile/core/domain/entities/doctor/doctor_entity.dart';

abstract class RemoteDoctorState extends Equatable {
  final List<Doctor>? doctors;
  final DioException? error;

  const RemoteDoctorState({this.doctors, this.error});

  @override
  List<Object> get props => [doctors!, error!];
}

class RemoteDoctorLoading extends RemoteDoctorState {
  const RemoteDoctorLoading();
}

class RemoteDoctorDone extends RemoteDoctorState {
  const RemoteDoctorDone(List<Doctor> doctor) : super(doctors: doctor);
}

class RemoteDoctorError extends RemoteDoctorState {
  const RemoteDoctorError(DioException error) : super(error: error);
}
