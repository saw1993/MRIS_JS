import 'package:mobile/core/data/model/pharmacy/pharmacy_model.dart';

abstract class PharmacyRepository {
  Future<List<PharmacyModel>> getAllPharmacies();
  Future<PharmacyModel?> getPharmacyById(int id);
  Future<void> addPharmacy(PharmacyModel pharmacy);
  Future<void> addPharmacies(List<PharmacyModel> pharmacies);
  Future<void> updatePharmacy(PharmacyModel pharmacy);
  Future<void> deletePharmacy(PharmacyModel pharmacy);
}
