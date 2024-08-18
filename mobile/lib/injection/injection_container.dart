import 'package:get_it/get_it.dart';
import 'package:dio/dio.dart';
import 'package:mobile/config/routes/navigate_services.dart';
import 'package:mobile/features/doctorlist/data/repository/doctor_repository_imp.dart';
import 'package:mobile/features/doctorlist/domain/repository/doctor_repository.dart';
import 'package:mobile/features/doctorlist/domain/usecases/get_doctor.dart';
import 'package:mobile/features/doctorlist/presentation/bloc/doctor/remote/remote_doctor_bloc.dart';
import 'package:mobile/features/login/data/repository/auth_repository_Imp.dart';
import 'package:mobile/features/login/domain/repository/auth_repository.dart';
import 'package:mobile/features/login/domain/usecases/login.dart';
import 'package:mobile/features/login/presentation/viewModel/login_view_model.dart';
import 'package:mobile/service/auth_api_service.dart';
import 'package:mobile/service/doctor_api_service.dart';

final sl = GetIt.instance;

Future<void> initializeDependancies() async {
  // Dio
  sl.registerSingleton<Dio>(Dio());

  //navigation services
  sl.registerSingleton<NavigationService>(NavigationService());

  //Doctor Api
  sl.registerSingleton<DoctorApiService>(DoctorApiService(sl()));
  sl.registerSingleton<AuthApiService>(AuthApiService(sl()));

  //repository
  sl.registerSingleton<DoctorRepository>(DoctorRepositoryImp(sl()));
  sl.registerSingleton<AuthRepository>(AuthRepositoryImp(sl()));

  //usecases
  sl.registerSingleton<GetDoctorsUseCase>(GetDoctorsUseCase(sl()));
  sl.registerSingleton<LoginUseCase>(LoginUseCase(sl()));

  // Register ViewModel
  sl.registerFactory(() => LoginViewModel(
        loginUseCase: sl<LoginUseCase>(),
        navigationService:
            sl<NavigationService>(), // Provide the navigationService here
      ));

  //Bloc
  sl.registerFactory<RemoteDoctorBloc>(() => RemoteDoctorBloc(sl()));
}
