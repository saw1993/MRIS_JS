import 'package:equatable/equatable.dart';

class Doctor extends Equatable {
  final int doctorId;
  final int categoryId;
  final String name;
  final int telephone;
  final String email;
  final int slmcNo;
  final String birthday;
  final String remarks;
  final int frequency;
  final int specialityId;
  final int townId;

  const Doctor({
    required this.doctorId,
    required this.categoryId,
    required this.name,
    required this.telephone,
    required this.email,
    required this.slmcNo,
    required this.birthday,
    required this.remarks,
    required this.frequency,
    required this.specialityId,
    required this.townId,
  });

  // Factory constructor to create a Doctor from JSON
  factory Doctor.fromJson(Map<String, dynamic> json) {
    return Doctor(
      doctorId: json['doctor_id'],
      categoryId: json['category_id'],
      name: json['name'],
      telephone: json['telephone'],
      email: json['email'],
      slmcNo: json['slmc_no'],
      birthday: json['birthday'],
      remarks: json['remarks'],
      frequency: json['frequency'],
      specialityId: json['speciality_id'],
      townId: json['town_id'],
    );
  }

  // Method to convert a Doctor to JSON
  Map<String, dynamic> toJson() {
    return {
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

  @override
  List<Object?> get props => [
        doctorId,
        categoryId,
        name,
        telephone,
        email,
        slmcNo,
        birthday,
        remarks,
        frequency,
        specialityId,
        townId,
      ];
}
