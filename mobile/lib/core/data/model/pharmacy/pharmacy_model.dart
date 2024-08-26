import 'package:floor/floor.dart';
import 'package:mobile/core/constants/tables.dart';
import 'package:mobile/core/domain/entities/pharmacy/pharmacy_entity.dart';

@Entity(tableName: pharmacy_table)
class PharmacyModel extends Pharmacy {
  @PrimaryKey(autoGenerate: false)
  final int? id; // Optional, if you need auto-incrementing IDs

  const PharmacyModel({
    this.id,
    required super.pharmacyId,
    required super.categoryId,
    required super.name,
    required super.telephone,
    required super.email,
    required super.remarks,
    required super.townId,
  });

  factory PharmacyModel.fromJson(Map<String, dynamic> json) {
    return PharmacyModel(
      id: json['id'],
      pharmacyId: json['ph_id'],
      categoryId: json['category_id'],
      name: json['name'],
      telephone: json['telephone'],
      email: json['email'],
      remarks: json['remarks'],
      townId: json['town_id'],
    );
  }

  @override
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'ph_id': pharmacyId,
      'category_id': categoryId,
      'name': name,
      'telephone': telephone,
      'email': email,
      'remarks': remarks,
      'town_id': townId,
    };
  }
}
