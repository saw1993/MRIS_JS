// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'app_database.dart';

// **************************************************************************
// FloorGenerator
// **************************************************************************

abstract class $AppDatabaseBuilderContract {
  /// Adds migrations to the builder.
  $AppDatabaseBuilderContract addMigrations(List<Migration> migrations);

  /// Adds a database [Callback] to the builder.
  $AppDatabaseBuilderContract addCallback(Callback callback);

  /// Creates the database and initializes it.
  Future<AppDatabase> build();
}

// ignore: avoid_classes_with_only_static_members
class $FloorAppDatabase {
  /// Creates a database builder for a persistent database.
  /// Once a database is built, you should keep a reference to it and re-use it.
  static $AppDatabaseBuilderContract databaseBuilder(String name) =>
      _$AppDatabaseBuilder(name);

  /// Creates a database builder for an in memory database.
  /// Information stored in an in memory database disappears when the process is killed.
  /// Once a database is built, you should keep a reference to it and re-use it.
  static $AppDatabaseBuilderContract inMemoryDatabaseBuilder() =>
      _$AppDatabaseBuilder(null);
}

class _$AppDatabaseBuilder implements $AppDatabaseBuilderContract {
  _$AppDatabaseBuilder(this.name);

  final String? name;

  final List<Migration> _migrations = [];

  Callback? _callback;

  @override
  $AppDatabaseBuilderContract addMigrations(List<Migration> migrations) {
    _migrations.addAll(migrations);
    return this;
  }

  @override
  $AppDatabaseBuilderContract addCallback(Callback callback) {
    _callback = callback;
    return this;
  }

  @override
  Future<AppDatabase> build() async {
    final path = name != null
        ? await sqfliteDatabaseFactory.getDatabasePath(name!)
        : ':memory:';
    final database = _$AppDatabase();
    database.database = await database.open(
      path,
      _migrations,
      _callback,
    );
    return database;
  }
}

class _$AppDatabase extends AppDatabase {
  _$AppDatabase([StreamController<String>? listener]) {
    changeListener = listener ?? StreamController<String>.broadcast();
  }

  DoctorDao? _doctorDaoInstance;

  PharmacyDao? _pharmacyDaoInstance;

  Future<sqflite.Database> open(
    String path,
    List<Migration> migrations, [
    Callback? callback,
  ]) async {
    final databaseOptions = sqflite.OpenDatabaseOptions(
      version: 1,
      onConfigure: (database) async {
        await database.execute('PRAGMA foreign_keys = ON');
        await callback?.onConfigure?.call(database);
      },
      onOpen: (database) async {
        await callback?.onOpen?.call(database);
      },
      onUpgrade: (database, startVersion, endVersion) async {
        await MigrationAdapter.runMigrations(
            database, startVersion, endVersion, migrations);

        await callback?.onUpgrade?.call(database, startVersion, endVersion);
      },
      onCreate: (database, version) async {
        await database.execute(
            'CREATE TABLE IF NOT EXISTS `doctor_table` (`id` INTEGER, `doctorId` INTEGER NOT NULL, `categoryId` INTEGER NOT NULL, `name` TEXT NOT NULL, `telephone` INTEGER NOT NULL, `email` TEXT NOT NULL, `slmcNo` INTEGER NOT NULL, `birthday` TEXT NOT NULL, `remarks` TEXT NOT NULL, `frequency` INTEGER NOT NULL, `specialityId` INTEGER NOT NULL, `townId` INTEGER NOT NULL, PRIMARY KEY (`id`))');
        await database.execute(
            'CREATE TABLE IF NOT EXISTS `pharmacy_table` (`id` INTEGER, `pharmacyId` INTEGER NOT NULL, `categoryId` INTEGER NOT NULL, `name` TEXT NOT NULL, `telephone` INTEGER NOT NULL, `email` TEXT NOT NULL, `remarks` TEXT NOT NULL, `townId` INTEGER NOT NULL, PRIMARY KEY (`id`))');

        await callback?.onCreate?.call(database, version);
      },
    );
    return sqfliteDatabaseFactory.openDatabase(path, options: databaseOptions);
  }

  @override
  DoctorDao get doctorDao {
    return _doctorDaoInstance ??= _$DoctorDao(database, changeListener);
  }

  @override
  PharmacyDao get pharmacyDao {
    return _pharmacyDaoInstance ??= _$PharmacyDao(database, changeListener);
  }
}

class _$DoctorDao extends DoctorDao {
  _$DoctorDao(
    this.database,
    this.changeListener,
  )   : _queryAdapter = QueryAdapter(database),
        _doctorModelInsertionAdapter = InsertionAdapter(
            database,
            'doctor_table',
            (DoctorModel item) => <String, Object?>{
                  'id': item.id,
                  'doctorId': item.doctorId,
                  'categoryId': item.categoryId,
                  'name': item.name,
                  'telephone': item.telephone,
                  'email': item.email,
                  'slmcNo': item.slmcNo,
                  'birthday': item.birthday,
                  'remarks': item.remarks,
                  'frequency': item.frequency,
                  'specialityId': item.specialityId,
                  'townId': item.townId
                }),
        _doctorModelUpdateAdapter = UpdateAdapter(
            database,
            'doctor_table',
            ['id'],
            (DoctorModel item) => <String, Object?>{
                  'id': item.id,
                  'doctorId': item.doctorId,
                  'categoryId': item.categoryId,
                  'name': item.name,
                  'telephone': item.telephone,
                  'email': item.email,
                  'slmcNo': item.slmcNo,
                  'birthday': item.birthday,
                  'remarks': item.remarks,
                  'frequency': item.frequency,
                  'specialityId': item.specialityId,
                  'townId': item.townId
                }),
        _doctorModelDeletionAdapter = DeletionAdapter(
            database,
            'doctor_table',
            ['id'],
            (DoctorModel item) => <String, Object?>{
                  'id': item.id,
                  'doctorId': item.doctorId,
                  'categoryId': item.categoryId,
                  'name': item.name,
                  'telephone': item.telephone,
                  'email': item.email,
                  'slmcNo': item.slmcNo,
                  'birthday': item.birthday,
                  'remarks': item.remarks,
                  'frequency': item.frequency,
                  'specialityId': item.specialityId,
                  'townId': item.townId
                });

  final sqflite.DatabaseExecutor database;

  final StreamController<String> changeListener;

  final QueryAdapter _queryAdapter;

  final InsertionAdapter<DoctorModel> _doctorModelInsertionAdapter;

  final UpdateAdapter<DoctorModel> _doctorModelUpdateAdapter;

  final DeletionAdapter<DoctorModel> _doctorModelDeletionAdapter;

  @override
  Future<List<DoctorModel>> getAllDoctors() async {
    return _queryAdapter.queryList('SELECT * FROM doctor_table',
        mapper: (Map<String, Object?> row) => DoctorModel(
            id: row['id'] as int?,
            doctorId: row['doctorId'] as int,
            categoryId: row['categoryId'] as int,
            name: row['name'] as String,
            telephone: row['telephone'] as int,
            email: row['email'] as String,
            slmcNo: row['slmcNo'] as int,
            birthday: row['birthday'] as String,
            remarks: row['remarks'] as String,
            frequency: row['frequency'] as int,
            specialityId: row['specialityId'] as int,
            townId: row['townId'] as int));
  }

  @override
  Future<DoctorModel?> getDoctorById(int id) async {
    return _queryAdapter.query('SELECT * FROM doctor_table WHERE doctorId = ?1',
        mapper: (Map<String, Object?> row) => DoctorModel(
            id: row['id'] as int?,
            doctorId: row['doctorId'] as int,
            categoryId: row['categoryId'] as int,
            name: row['name'] as String,
            telephone: row['telephone'] as int,
            email: row['email'] as String,
            slmcNo: row['slmcNo'] as int,
            birthday: row['birthday'] as String,
            remarks: row['remarks'] as String,
            frequency: row['frequency'] as int,
            specialityId: row['specialityId'] as int,
            townId: row['townId'] as int),
        arguments: [id]);
  }

  @override
  Future<void> insertDoctor(DoctorModel doctor) async {
    await _doctorModelInsertionAdapter.insert(
        doctor, OnConflictStrategy.replace);
  }

  @override
  Future<void> insertDoctors(List<DoctorModel> doctors) async {
    await _doctorModelInsertionAdapter.insertList(
        doctors, OnConflictStrategy.replace);
  }

  @override
  Future<void> updateDoctor(DoctorModel doctor) async {
    await _doctorModelUpdateAdapter.update(doctor, OnConflictStrategy.abort);
  }

  @override
  Future<void> deleteDoctor(DoctorModel doctor) async {
    await _doctorModelDeletionAdapter.delete(doctor);
  }
}

class _$PharmacyDao extends PharmacyDao {
  _$PharmacyDao(
    this.database,
    this.changeListener,
  )   : _queryAdapter = QueryAdapter(database),
        _pharmacyModelInsertionAdapter = InsertionAdapter(
            database,
            'pharmacy_table',
            (PharmacyModel item) => <String, Object?>{
                  'id': item.id,
                  'pharmacyId': item.pharmacyId,
                  'categoryId': item.categoryId,
                  'name': item.name,
                  'telephone': item.telephone,
                  'email': item.email,
                  'remarks': item.remarks,
                  'townId': item.townId
                }),
        _pharmacyModelUpdateAdapter = UpdateAdapter(
            database,
            'pharmacy_table',
            ['id'],
            (PharmacyModel item) => <String, Object?>{
                  'id': item.id,
                  'pharmacyId': item.pharmacyId,
                  'categoryId': item.categoryId,
                  'name': item.name,
                  'telephone': item.telephone,
                  'email': item.email,
                  'remarks': item.remarks,
                  'townId': item.townId
                }),
        _pharmacyModelDeletionAdapter = DeletionAdapter(
            database,
            'pharmacy_table',
            ['id'],
            (PharmacyModel item) => <String, Object?>{
                  'id': item.id,
                  'pharmacyId': item.pharmacyId,
                  'categoryId': item.categoryId,
                  'name': item.name,
                  'telephone': item.telephone,
                  'email': item.email,
                  'remarks': item.remarks,
                  'townId': item.townId
                });

  final sqflite.DatabaseExecutor database;

  final StreamController<String> changeListener;

  final QueryAdapter _queryAdapter;

  final InsertionAdapter<PharmacyModel> _pharmacyModelInsertionAdapter;

  final UpdateAdapter<PharmacyModel> _pharmacyModelUpdateAdapter;

  final DeletionAdapter<PharmacyModel> _pharmacyModelDeletionAdapter;

  @override
  Future<List<PharmacyModel>> findAllPharmacies() async {
    return _queryAdapter.queryList('SELECT * FROM pharmacy_table',
        mapper: (Map<String, Object?> row) => PharmacyModel(
            id: row['id'] as int?,
            pharmacyId: row['pharmacyId'] as int,
            categoryId: row['categoryId'] as int,
            name: row['name'] as String,
            telephone: row['telephone'] as int,
            email: row['email'] as String,
            remarks: row['remarks'] as String,
            townId: row['townId'] as int));
  }

  @override
  Future<PharmacyModel?> findPharmacyById(int id) async {
    return _queryAdapter.query('SELECT * FROM pharmacy_table WHERE ph_id = ?1',
        mapper: (Map<String, Object?> row) => PharmacyModel(
            id: row['id'] as int?,
            pharmacyId: row['pharmacyId'] as int,
            categoryId: row['categoryId'] as int,
            name: row['name'] as String,
            telephone: row['telephone'] as int,
            email: row['email'] as String,
            remarks: row['remarks'] as String,
            townId: row['townId'] as int),
        arguments: [id]);
  }

  @override
  Future<void> insertPharmacy(PharmacyModel pharmacy) async {
    await _pharmacyModelInsertionAdapter.insert(
        pharmacy, OnConflictStrategy.replace);
  }

  @override
  Future<void> insertPharmacies(List<PharmacyModel> pharmacies) async {
    await _pharmacyModelInsertionAdapter.insertList(
        pharmacies, OnConflictStrategy.replace);
  }

  @override
  Future<void> updatePharmacy(PharmacyModel pharmacy) async {
    await _pharmacyModelUpdateAdapter.update(
        pharmacy, OnConflictStrategy.replace);
  }

  @override
  Future<void> deletePharmacy(PharmacyModel pharmacy) async {
    await _pharmacyModelDeletionAdapter.delete(pharmacy);
  }
}
