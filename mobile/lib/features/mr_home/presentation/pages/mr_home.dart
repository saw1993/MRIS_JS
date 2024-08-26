import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:mobile/features/mr_home/presentation/viewmodel/mr_viewmodel.dart';

class MRHomeScreen extends StatefulWidget {
  @override
  _MRHomeScreenState createState() => _MRHomeScreenState();
}

class _MRHomeScreenState extends State<MRHomeScreen> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  late MedicalRepDashboardViewModel _viewModel;

  @override
  void initState() {
    super.initState();
    _viewModel = GetIt.instance<MedicalRepDashboardViewModel>();
    // _userViewModel.fetchUserData();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      appBar: AppBar(
        title: Row(
          children: [Text('MRIS App')],
        ),
        centerTitle: true,
        automaticallyImplyLeading: true,
        leading: IconButton(
          onPressed: () {
            _scaffoldKey.currentState?.openDrawer();
          },
          icon: Icon(Icons.menu),
        ),
      ),
      drawer: _buildDrawer(), // Build the drawer
      body: Center(
        child: Text('Main Content Area'),
      ),
    );
  }

  Widget _buildDrawer() {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          UserAccountsDrawerHeader(
            decoration: BoxDecoration(
              color: Colors.blue,
            ),
            accountName: Text(_viewModel.name),
            accountEmail: Text(_viewModel.designation),
            currentAccountPicture: CircleAvatar(
              backgroundImage: NetworkImage(_viewModel.profileImageUrl),
            ),
          ),
          ExpansionTile(
            leading: Icon(Icons.list),
            title: Text('Master Lists'),
            children: [
              ListTile(
                leading: Icon(Icons.person),
                title: Text('MSL Doctor List'),
                onTap: () {
                  // Navigate to Doctor List
                  _viewModel.navigateToDoctorList();
                },
              ),
              ListTile(
                leading: Icon(Icons.local_pharmacy),
                title: Text('Chemist List'),
                onTap: () {
                  // Navigate to Chemist List
                  _viewModel.navigateToChemistList();
                },
              ),
            ],
          ),
          ListTile(
            leading: Icon(Icons.settings),
            title: Text('Settings'),
            onTap: () {
              // Handle navigation to settings
            },
          ),
        ],
      ),
    );
  }
}
