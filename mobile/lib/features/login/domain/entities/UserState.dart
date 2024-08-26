import 'package:mobile/features/login/domain/entities/User.dart';

class UserResponse {
  final User user;
  final String status;
  final String message;

  UserResponse({
    required this.user,
    required this.status,
    required this.message,
  });

  // Factory constructor to create a UserResponse instance from a JSON map
  factory UserResponse.fromJson(Map<String, dynamic> json) {
    return UserResponse(
      user: User.fromJson(json['user']),
      status: json['status'] ?? '',
      message: json['message'] ?? '',
    );
  }

  // Method to convert a UserResponse instance to a JSON map
  Map<String, dynamic> toJson() {
    return {
      'user': user.toJson(),
      'status': status,
      'message': message,
    };
  }
}
