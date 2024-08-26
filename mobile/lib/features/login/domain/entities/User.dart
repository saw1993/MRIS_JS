import 'dart:math';

class User {
  final int userId;
  final String username;
  final String email;
  final String password;
  final int roleId;
  final DateTime createdAt;
  final DateTime updatedAt;
  final int? agencyId;
  final String? remarks;
  final String? telephone;

  User({
    required this.userId,
    required this.username,
    required this.email,
    required this.password,
    required this.roleId,
    required this.createdAt,
    required this.updatedAt,
    this.agencyId,
    this.remarks,
    this.telephone,
  });

  // Factory constructor to create a User instance from a JSON map
  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      userId: json['user_id'] != null ? json['user_id'] as int : 0,
      username: json['username'] ?? '',
      email: json['email'] ?? '',
      password: json['password'] ?? '',
      roleId: json['role_id'] != null ? json['role_id'] as int : 0,
      createdAt: json['created_at'] != null
          ? DateTime.parse(json['created_at'] as String)
          : DateTime.now(),
      updatedAt: json['updated_at'] != null
          ? DateTime.parse(json['updated_at'] as String)
          : DateTime.now(),
      agencyId: json['agency_id'] != null ? json['agency_id'] as int? : null,
      remarks: json['remarks'] as String?,
      telephone: json['telephone'] as String?,
    );
  }

  // Method to convert a User instance to a JSON map
  Map<String, dynamic> toJson() {
    return {
      'user_id': userId,
      'username': username,
      'email': email,
      'password': password,
      'role_id': roleId,
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
      'agency_id': agencyId,
      'remarks': remarks,
      'telephone': telephone,
    };
  }
}
