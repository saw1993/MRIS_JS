import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:get_it/get_it.dart';
import 'package:dio/dio.dart';
import 'package:mobile/config/routes/navigate_services.dart';
import 'package:mobile/core/data/data_sources/local/app_database.dart';
import 'package:mobile/core/data/data_sources/local/doctor/doctor_dao.dart';
import 'package:mobile/core/data/data_sources/local/pharmacy/pharmacy_dao.dart';
import 'package:mobile/core/data/repository/doctor/doctor_repository_imp.dart';
import 'package:mobile/core/data/repository/pharmacy/pharmacy_repository_imp.dart';
import 'package:mobile/core/data/repository/token/token_repository_Imp.dart';
import 'package:mobile/core/domain/repository/doctor/doctor_repository.dart';
import 'package:mobile/core/domain/repository/pharmacy/pharmacy_repository.dart';
import 'package:mobile/core/domain/repository/token/token_repositroy.dart';
import 'package:mobile/core/domain/usecases/doctor/doctor_usecases.dart';
import 'package:mobile/core/domain/usecases/doctor/get_doctor.dart';
import 'package:mobile/core/domain/usecases/doctor/sync_doctor.dart';
import 'package:mobile/core/domain/usecases/token/token_delete.dart';
import 'package:mobile/core/domain/usecases/token/token_read.dart';
import 'package:mobile/core/domain/usecases/token/token_save.dart';
import 'package:mobile/core/domain/usecases/token/token_usecases.dart';
import 'package:mobile/features/doctorlist/presentation/bloc/doctor/remote/remote_doctor_event.dart';
import 'package:mobile/features/doctorlist/presentation/viewmodel/doctor_list_viewmodel.dart';
import 'package:mobile/core/data/repository/auth/auth_repository_Imp.dart';
import 'package:mobile/core/domain/repository/auth/auth_repository.dart';
import 'package:mobile/core/domain/usecases/auth/login.dart';
import 'package:mobile/features/login/presentation/viewModel/login_view_model.dart';
import 'package:mobile/features/mr_home/presentation/viewmodel/mr_viewmodel.dart';
import 'package:mobile/service/auth_api_service.dart';
import 'package:mobile/service/doctor_api_service.dart';

final sl = GetIt.instance;

Future<void> initializeDependencies() async {
  // Registering AppDatabase asynchronously and making sure it's ready before usage
  sl.registerSingletonAsync<AppDatabase>(() async {
    final database =
        await $FloorAppDatabase.databaseBuilder('app_database.db').build();
    return database;
  });

  // Ensure all asynchronous singletons are ready
  await sl.allReady();

  // Dio
  sl.registerSingleton<Dio>(Dio());

  // FlutterSecureStorage
  sl.registerLazySingleton(() => const FlutterSecureStorage());

  // NavigationService
  sl.registerLazySingleton(() => NavigationService());

  // API Services
  sl.registerSingleton<DoctorApiService>(DoctorApiService(sl()));
  sl.registerSingleton<AuthApiService>(AuthApiService(sl()));

  // Register DAOs after database is ready
  sl.registerLazySingleton<DoctorDao>(() => sl<AppDatabase>().doctorDao);
  sl.registerLazySingleton<PharmacyDao>(() => sl<AppDatabase>().pharmacyDao);

  // Register TokenRepository and related Use Cases
  sl.registerLazySingleton<TokenRepository>(
      () => TokenRepositoryImpl(secureStorage: sl()));
  sl.registerLazySingleton(() => TokenUseCases(
        saveToken: SaveTokenUseCase(sl()),
        getToken: GetTokenUseCase(sl()),
        deleteToken: DeleteTokenUseCase(sl()),
      ));

  // Register Repositories
  sl.registerLazySingleton<DoctorRepository>(
      () => DoctorRepositoryImp(sl(), sl(), sl()));
  sl.registerLazySingleton<AuthRepository>(() => AuthRepositoryImp(sl()));
  sl.registerLazySingleton<PharmacyRepository>(
      () => PharmacyRepositoryImpl(sl()));

  sl.registerLazySingleton(() =>
      DoctorUseCases(getDoctors: const GetDoctors(), syncDoctors: SyncDoctors(sl())));

  // Register Use Cases
  sl.registerLazySingleton(() => GetDoctorsUseCase(sl()));
  sl.registerLazySingleton(() => LoginUseCase(sl()));

  // Register ViewModels
  sl.registerFactory(() => LoginViewModel(
        loginUseCase: sl<LoginUseCase>(),
        navigationService: sl<NavigationService>(),
        tokenRepository: sl<TokenRepository>(),
      ));

  sl.registerFactory(() => MedicalRepDashboardViewModel(
        navigationService: sl<NavigationService>(),
      ));

  sl.registerFactory(() => DoctorListViewModel(doctorUseCases: sl()));
}
