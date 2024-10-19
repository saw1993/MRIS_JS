
import 'package:floor/floor.dart';
import 'package:mobile/core/constants/tables.dart';
import 'package:mobile/core/domain/entities/doctor/doctor_entity.dart';

@Entity(tableName: doctor_table)
class DoctorModel extends Doctor {
  @PrimaryKey(autoGenerate: false)
  final int? id; // Optional, if you need auto-incrementing IDs

  const DoctorModel({
    this.id,
    required super.doctorId,
    required super.categoryId,
    required super.name,
    required super.telephone,
    required super.email,
    required super.slmcNo,
    required super.birthday,
    required super.remarks,
    required super.frequency,
    required super.specialityId,
    required super.townId,
  });

  factory DoctorModel.fromJson(Map<String, dynamic> json) {
    return DoctorModel(
      id: json['id'] != null ? json['id'] as int : null,
      doctorId: json['doctor_id'],
      categoryId: json['category_id'] != null ? json['category_id'] as int : 0,
      name: json['name'] as String? ?? '',
      telephone: json['telephone'] != null ? json['telephone'] as int : 0,
      email: json['email'] as String? ?? '',
      slmcNo: json['slmc_no'] != null ? json['slmc_no'] as int : 0,
      birthday: json['birthday'] as String? ?? '',
      remarks: json['remarks'] as String? ?? '',
      frequency: json['frequency'] != null ? json['frequency'] as int : 0,
      specialityId:
          json['speciality_id'] != null ? json['speciality_id'] as int : 0,
      townId: json['town_id'] != null ? json['town_id'] as int : 0,
    );
  }

  @override
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'doctor_id': doctorId,
      'category_id': categoryId,
      'name': name,
      'telephone': telephone,
      'email': email,
      'slmc_no': slmcNo,
      'birthday': birthday,
      'remarks': remarks,
      'frequency': frequency,
      'speciality_id': specialityId,
      'town_id': townId,
    };
  }
}
