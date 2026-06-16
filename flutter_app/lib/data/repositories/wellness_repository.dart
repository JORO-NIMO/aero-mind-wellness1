import 'package:hive_flutter/hive_flutter.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'api_service.dart';

class WellnessRepository {
  final ApiService apiService;
  final Box _cache = Hive.box('wellness_cache');

  WellnessRepository({required this.apiService});

  Future<Map<String, dynamic>> getMetrics() async {
    final connectivity = await Connectivity().checkConnectivity();
    final hasConnection = !connectivity.contains(ConnectivityResult.none);

    if (hasConnection) {
      try {
        final data = await apiService.getMetrics();
        await _cache.put('latest_metrics', data);
        return data;
      } catch (e) {
        // Fallback to cache if request fails despite having connection
        return _getCachedMetrics();
      }
    } else {
      return _getCachedMetrics();
    }
  }

  Map<String, dynamic> _getCachedMetrics() {
    final cached = _cache.get('latest_metrics');
    if (cached != null) {
      return Map<String, dynamic>.from(cached);
    }
    // Return empty but structured data if no cache exists
    return {
      'score': 0,
      'heartRate': 0,
      'sleepHours': 0,
      'steps': 0,
      'history': [],
      'insights': ['⚠️ No offline data available. Please connect to the internet.']
    };
  }
}
