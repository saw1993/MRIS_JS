import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:mobile/core/domain/usecases/doctor/doctor_usecases.dart';
import 'package:mobile/core/resources/data_state.dart';
import 'package:mobile/features/doctorlist/data/models/doctor_model.dart';

class Doctor {
  final String name;
  final String specialty;

  Doctor({required this.name, required this.specialty});
}

class DoctorListViewModel extends ChangeNotifier {
  final DoctorUseCases doctorUseCases;
  bool isLoading = false;

  DoctorListViewModel({required this.doctorUseCases});

  List<Doctor> _doctors = [
    Doctor(name: "Dr. Smith", specialty: "Cardiology"),
    Doctor(name: "Dr. Jane", specialty: "Neurology"),
    // Add more doctors here
  ];

  List<Doctor> get doctors => _doctors;

  Future<void> fetchDoctors() async {
    try {
      isLoading = true;
      notifyListeners();

      // Fetch doctors using the use case
      final dataState = await doctorUseCases.getDoctors;
      for (var doctor in dataState.) {
        log(doctor
            .toString()); // Adjust this to print specific fields if needed
      }
    } catch (e) {
      // Handle unexpected errors
      print('Unexpected error fetching doctors: $e');
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }

  void filterDoctors(String specialty) {
    // Logic to filter the list of doctors based on specialty
    notifyListeners();
  }

  void applyFilter() {}

  void onMenuSelected(String value) {}

  void addNewDoctor() {}

  void syncData() {
    isLoading = true;
    doctorUseCases.syncDoctors.execute();
  }
}
