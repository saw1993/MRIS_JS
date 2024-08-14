import 'package:mobile/features/doctorlist/domain/entities/doctorentity.dart';

class DoctorModel extends Doctor {
  const DoctorModel(
      {required super.doctorId,
      required super.categoryId,
      required super.name,
      required super.telephone,
      required super.email,
      required super.slmcNo,
      required super.birthday,
      required super.remarks,
      required super.frequency,
      required super.specialityId,
      required super.townId});

  factory DoctorModel.fromJson(Map<String, dynamic> json) {
    return DoctorModel(
      doctorId: json['doctor_id'],
      categoryId: json['category_id'],
      name: json['name'],
      telephone: json['telephone'],
      email: json['email'],
      slmcNo: json['slmc_no'],
      birthday: DateTime.parse(json['birthday']),
      remarks: json['remarks'],
      frequency: json['frequency'],
      specialityId: json['speciality_id'],
      townId: json['town_id'],
    );
  }
}
