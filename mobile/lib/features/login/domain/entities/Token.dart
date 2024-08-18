class UserToken {
  final String token;
  final String status;

  UserToken({required this.token, required this.status});

  // Factory constructor for creating a new `UserToken` instance from a map.
  factory UserToken.fromJson(Map<String, dynamic> json) {
    return UserToken(
      token: json['token'] as String,
      status: json['status'] as String, // Add status here
    );
  }

  // Factory constructor for creating a new `UserToken` from an entity.
  factory UserToken.fromEntity(UserToken entity) {
    return UserToken(
      token: entity.token,
      status: entity.status, // Add status here
    );
  }

  // Method to convert `UserToken` instance into a map.
  Map<String, dynamic> toJson() {
    return {
      'token': token,
      'status': status, // Add status here
    };
  }
}
