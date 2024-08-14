import 'package:flutter/material.dart';

class DoctorList extends StatelessWidget {
  const DoctorList({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildAppBar(),
    );
  }
}

_buildAppBar() {
  return AppBar(
      title: const Text(
    'Doctor List',
    style: TextStyle(color: Colors.black),
  ));
}
