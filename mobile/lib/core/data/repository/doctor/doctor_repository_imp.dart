
import 'package:mobile/core/data/data_sources/local/doctor/doctor_dao.dart';
import 'package:mobile/core/domain/repository/token/token_repositroy.dart';
import 'package:mobile/core/resources/data_state.dart';
import 'package:mobile/features/doctorlist/data/models/doctor_model.dart';
import 'package:mobile/core/domain/repository/doctor/doctor_repository.dart';
import 'package:mobile/service/doctor_api_service.dart';

class DoctorRepositoryImp implements DoctorRepository {
  final DoctorDao doctorDao;
  final DoctorApiService doctorApi;
  final TokenRepository tokenRepository;

  DoctorRepositoryImp(this.doctorApi, this.doctorDao, this.tokenRepository);
  @override
  Future<DataState<List<DoctorModel>>> getDoctors() async {
    try {
      final response = await doctorDao.getAllDoctors();
      return DataState.success(response);
    } catch (e) {
      // Return error state with error message
      return DataState.error(e.toString());
    }
  }

  @override
  Future<DataState<List<DoctorModel>>> syncDoctors() async {
    final token = await tokenRepository.getToken();
    try {
      final response = await doctorApi.getDoctors(token as String);
      doctorDao.insertDoctors(response.data);
      return DataState.success(response.data);
    } catch (e) {
      // Return error state with error message
      return DataState.error(e.toString());
    }
  }
}
