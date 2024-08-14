import 'dart:io';

import 'package:dio/dio.dart';
import 'package:mobile/core/constants/constants.dart';
import 'package:mobile/core/resources/data_state.dart';
import 'package:mobile/features/doctorlist/data/models/doctor.dart';
import 'package:mobile/features/doctorlist/domain/entities/doctorentity.dart';
import 'package:mobile/features/doctorlist/domain/repository/doctor_repository.dart';
import 'package:mobile/service/doctor_api_service.dart';

class DoctorRepositoryImp implements DoctorRepository {
  final DoctorApiService _doctorApiService;
  DoctorRepositoryImp(this._doctorApiService);

  @override
  Future<DataState<List<DoctorModel>>> getDoctors() async {
    try {
      final httpResponse = await _doctorApiService.getDoctors(jwtToken);

      if (httpResponse.response.statusCode == HttpStatus.ok) {
        return DataSuccess(httpResponse.data);
      } else {
        return DataFailed(DioException(
            error: httpResponse.response.statusMessage,
            response: httpResponse.response,
            type: DioExceptionType.badResponse,
            requestOptions: httpResponse.response.requestOptions));
      }
    } on DioException catch (e) {
      return DataFailed(e);
    }
  }
}
