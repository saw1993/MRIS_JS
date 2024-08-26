enum DataStateStatus { loading, success, error }

class DataState<T> {
  final DataStateStatus status;
  final T? data;
  final String? error;

  DataState.loading()
      : status = DataStateStatus.loading,
        data = null,
        error = null;
  DataState.success(this.data)
      : status = DataStateStatus.success,
        error = null;
  DataState.error(this.error)
      : status = DataStateStatus.error,
        data = null;
}
