import 'package:dio/dio.dart';
import 'package:mobile/core/constants/constants.dart';
import 'package:mobile/features/doctorlist/data/models/doctor_model.dart';
import 'package:retrofit/retrofit.dart';

part 'doctor_api_service.g.dart';

@RestApi(baseUrl: doctorAPIBaseURL)
abstract class DoctorApiService {
  factory DoctorApiService(Dio dio) = _DoctorApiService;

  @GET('/api/doctor/getall')
  Future<HttpResponse<List<DoctorModel>>> getDoctors(
    @Header('Authorization') String bearerToken,
  );
}
