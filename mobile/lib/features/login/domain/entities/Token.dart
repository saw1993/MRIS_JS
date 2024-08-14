class UserToken {
  final String token;
  UserToken({required this.token});

  // Factory constructor for creating a new `UserTokenModel` instance from a map.
  factory UserToken.fromJson(Map<String, dynamic> json) {
    return UserToken(
      token: json['token'] as String,
    );
  }

  // Factory constructor for creating a new `UserTokenModel` from an entity.
  factory UserToken.fromEntity(UserToken entity) {
    return UserToken(
      token: entity.token,
    );
  }

  // Method to convert `UserTokenModel` instance into a map.
  Map<String, dynamic> toJson() {
    return {
      'token': token,
    };
  }
}
