import 'dart:async';

import 'package:floor/floor.dart';
import 'package:floor/floor.dart';
import 'package:floor/floor.dart';
import 'package:floor_annotation/floor_annotation.dart';
import 'package:sqflite/sqflite.dart' as sqflite;
import 'package:mobile/core/data/data_sources/local/doctor/doctor_dao.dart';
import 'package:mobile/core/data/data_sources/local/pharmacy/pharmacy_dao.dart';
import 'package:mobile/core/data/model/pharmacy/pharmacy_model.dart';
import 'package:mobile/features/doctorlist/data/models/doctor_model.dart';

part 'app_database.g.dart';

@Database(version: 1, entities: [DoctorModel, PharmacyModel])
abstract class AppDatabase extends FloorDatabase {
  DoctorDao get doctorDao;
  PharmacyDao get pharmacyDao;
}
