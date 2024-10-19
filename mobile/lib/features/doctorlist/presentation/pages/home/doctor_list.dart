import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:mobile/features/doctorlist/presentation/viewmodel/doctor_list_viewmodel.dart';

class DoctorList extends StatefulWidget {
  const DoctorList({super.key});

  @override
  _DoctorListState createState() => _DoctorListState();
}

class _DoctorListState extends State<DoctorList> {
  late DoctorListViewModel _viewModel;

  @override
  void initState() {
    super.initState();
    _viewModel = GetIt.instance<DoctorListViewModel>();
    _viewModel.fetchDoctors();
    _viewModel.addListener(_onViewModelChanged);
  }

  @override
  void dispose() {
    _viewModel.removeListener(_onViewModelChanged);
    super.dispose();
  }

  void _onViewModelChanged() {
    if (mounted) {
      setState(() {});
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildAppBar(),
      body: Stack(
        children: [
          Column(
            children: [
              _buildFilters(),
              Expanded(
                child: ListView.builder(
                  itemCount: _viewModel.doctors.length,
                  itemBuilder: (context, index) {
                    final doctor = _viewModel.doctors[index];
                    return ListTile(
                      title: Text(doctor.name),
                      subtitle: Text(doctor.specialty),
                    );
                  },
                ),
              ),
            ],
          ),
          if (_viewModel.isLoading) _buildLoadingDialog(),
        ],
      ),
    );
  }

  AppBar _buildAppBar() {
    return AppBar(
      title: const Text(
        'MSL Doctor List',
        style: TextStyle(color: Colors.black),
      ),
      backgroundColor: Colors.white,
      iconTheme: const IconThemeData(color: Colors.black),
      actions: [
        IconButton(
          icon: const Icon(Icons.sync),
          onPressed: () {
            _viewModel.syncData();
          },
        ),
        IconButton(
          icon: const Icon(Icons.add),
          onPressed: () {
            _viewModel.addNewDoctor();
          },
        ),
        PopupMenuButton<String>(
          onSelected: (String value) {
            _viewModel.onMenuSelected(value);
          },
          itemBuilder: (BuildContext context) {
            return {'Option 1', 'Option 2'}.map((String choice) {
              return PopupMenuItem<String>(
                value: choice,
                child: Text(choice),
              );
            }).toList();
          },
        ),
      ],
    );
  }

  Widget _buildFilters() {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          DropdownButton<String>(
            items: <String>['Cardiology', 'Neurology', 'Dermatology']
                .map((String value) {
              return DropdownMenuItem<String>(
                value: value,
                child: Text(value),
              );
            }).toList(),
            onChanged: (String? newValue) {
              _viewModel.filterDoctors(newValue!);
            },
            hint: const Text('Select Specialty'),
          ),
          ElevatedButton(
            onPressed: () {
              _viewModel.applyFilter();
            },
            child: const Text('Apply Filter'),
          ),
        ],
      ),
    );
  }

  Widget _buildLoadingDialog() {
    return const Center(
      child: CircularProgressIndicator(),
    );
  }
}
