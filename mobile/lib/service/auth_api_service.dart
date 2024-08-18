import 'package:dio/dio.dart';
import 'package:mobile/core/constants/constants.dart';
import 'package:mobile/features/login/domain/entities/Token.dart';
import 'package:retrofit/retrofit.dart';

part 'auth_api_service.g.dart';

@RestApi(baseUrl: doctorAPIBaseURL)
abstract class AuthApiService {
  factory AuthApiService(Dio dio) = _AuthApiService;

  @POST("/api/auth/login")
  Future<HttpResponse<UserToken>> login(@Body() Map<String, String> body);
}
