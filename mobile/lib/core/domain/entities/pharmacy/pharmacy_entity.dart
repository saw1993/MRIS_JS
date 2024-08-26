import 'package:equatable/equatable.dart';

class Pharmacy extends Equatable {
  final int pharmacyId;
  final int categoryId;
  final String name;
  final int telephone;
  final String email;
  final String remarks;
  final int townId;

  const Pharmacy({
    required this.pharmacyId,
    required this.categoryId,
    required this.name,
    required this.telephone,
    required this.email,
    required this.remarks,
    required this.townId,
  });

  // Factory constructor to create a Pharmacy from JSON
  factory Pharmacy.fromJson(Map<String, dynamic> json) {
    return Pharmacy(
      pharmacyId: json['ph_id'],
      categoryId: json['category_id'],
      name: json['name'],
      telephone: json['telephone'],
      email: json['email'],
      remarks: json['remarks'],
      townId: json['town_id'],
    );
  }

  // Method to convert a Pharmacy to JSON
  Map<String, dynamic> toJson() {
    return {
      'ph_id': pharmacyId,
      'category_id': categoryId,
      'name': name,
      'telephone': telephone,
      'email': email,
      'remarks': remarks,
      'town_id': townId,
    };
  }

  @override
  List<Object?> get props => [
        pharmacyId,
        categoryId,
        name,
        telephone,
        email,
        remarks,
        townId,
      ];
}
