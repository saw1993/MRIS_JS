import 'package:flutter/material.dart';
import 'package:mobile/core/domain/usecases/doctor/doctor_usecases.dart';

class Doctor {
  final String name;
  final String specialty;

  Doctor({required this.name, required this.specialty});
}

class DoctorListViewModel extends ChangeNotifier {
  final DoctorUseCases doctorUseCases;
  bool isLoading = false;

  DoctorListViewModel({required this.doctorUseCases});

  final List<Doctor> _doctors = [
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
      final dataState = doctorUseCases.getDoctors;
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
