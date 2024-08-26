import 'package:mobile/core/data/data_sources/local/pharmacy/pharmacy_dao.dart';
import 'package:mobile/core/data/model/pharmacy/pharmacy_model.dart';
import 'package:mobile/core/domain/repository/pharmacy/pharmacy_repository.dart';

class PharmacyRepositoryImpl implements PharmacyRepository {
  final PharmacyDao _pharmacyDao;

  PharmacyRepositoryImpl(this._pharmacyDao);

  @override
  Future<List<PharmacyModel>> getAllPharmacies() {
    return _pharmacyDao.findAllPharmacies();
  }

  @override
  Future<PharmacyModel?> getPharmacyById(int id) {
    return _pharmacyDao.findPharmacyById(id);
  }

  @override
  Future<void> addPharmacy(PharmacyModel pharmacy) {
    return _pharmacyDao.insertPharmacy(pharmacy);
  }

  @override
  Future<void> addPharmacies(List<PharmacyModel> pharmacies) {
    return _pharmacyDao.insertPharmacies(pharmacies);
  }

  @override
  Future<void> updatePharmacy(PharmacyModel pharmacy) {
    return _pharmacyDao.updatePharmacy(pharmacy);
  }

  @override
  Future<void> deletePharmacy(PharmacyModel pharmacy) {
    return _pharmacyDao.deletePharmacy(pharmacy);
  }
}
