import 'package:flutter_bloc/flutter_bloc.dart';
import '../../data/repositories/wellness_repository.dart';

// Events
abstract class WellnessEvent {}
class WellnessMetricsRequested extends WellnessEvent {}

// States
abstract class WellnessState {}
class WellnessInitial extends WellnessState {}
class WellnessLoading extends WellnessState {}
class WellnessLoaded extends WellnessState {
  final Map<String, dynamic> data;
  WellnessLoaded(this.data);
}
class WellnessError extends WellnessState {
  final String message;
  WellnessError(this.message);
}

// BLoC
class WellnessBloc extends Bloc<WellnessEvent, WellnessState> {
  final WellnessRepository wellnessRepository;

  WellnessBloc({required this.wellnessRepository}) : super(WellnessInitial()) {
    on<WellnessMetricsRequested>((event, emit) async {
      emit(WellnessLoading());
      try {
        final data = await wellnessRepository.getMetrics();
        emit(WellnessLoaded(data));
      } catch (e) {
        emit(WellnessError('An error occurred while fetching metrics.'));
      }
    });
  }
}
