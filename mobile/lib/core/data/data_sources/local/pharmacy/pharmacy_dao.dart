import 'package:floor/floor.dart';
import 'package:mobile/core/constants/tables.dart';
import 'package:mobile/core/data/model/pharmacy/pharmacy_model.dart';

@dao
abstract class PharmacyDao {
  @Query('SELECT * FROM $pharmacy_table')
  Future<List<PharmacyModel>> findAllPharmacies();

  @Query('SELECT * FROM $pharmacy_table WHERE ph_id = :id')
  Future<PharmacyModel?> findPharmacyById(int id);

  @Insert(onConflict: OnConflictStrategy.replace)
  Future<void> insertPharmacy(PharmacyModel pharmacy);

  @Insert(onConflict: OnConflictStrategy.replace)
  Future<void> insertPharmacies(List<PharmacyModel> pharmacies);

  @Update(onConflict: OnConflictStrategy.replace)
  Future<void> updatePharmacy(PharmacyModel pharmacy);

  @delete
  Future<void> deletePharmacy(PharmacyModel pharmacy);
}
