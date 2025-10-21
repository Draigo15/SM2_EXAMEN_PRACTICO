import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../l10n/app_localizations.dart';
import '../providers/auth_provider.dart';
import '../utils/api_service.dart';

class LoginHistoryScreen extends StatefulWidget {
  const LoginHistoryScreen({super.key});

  @override
  State<LoginHistoryScreen> createState() => _LoginHistoryScreenState();
}

class _LoginHistoryScreenState extends State<LoginHistoryScreen> {
  final ApiService _api = ApiService();
  final List<dynamic> _events = [];
  int _totalCount = 0;
  int _page = 1;
  final int _limit = 10;
  bool _isLoading = false;
  bool _isLoadingMore = false;

  @override
  void initState() {
    super.initState();
    _fetchLoginHistory(initial: true);
  }

  Future<void> _fetchLoginHistory({bool initial = false}) async {
    if (_isLoading || _isLoadingMore) return;

    setState(() {
      if (initial) {
        _isLoading = true;
      } else {
        _isLoadingMore = true;
      }
    });

    try {
      final authProvider = Provider.of<AuthProvider>(context, listen: false);
      final token = authProvider.token;

      final response = await _api.getLoginHistory(token: token, page: _page, limit: _limit);

      if (response.success && response.data is Map<String, dynamic>) {
        final data = response.data as Map<String, dynamic>;
        final List<dynamic> newEvents = (data['events'] as List<dynamic>? ?? []);
        _totalCount = (data['totalCount'] as int?) ?? _totalCount;

        setState(() {
          if (initial) {
            _events
              ..clear()
              ..addAll(newEvents);
          } else {
            _events.addAll(newEvents);
          }
        });
      } else {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text(response.message)),
          );
        }
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.toString())),
        );
      }
    } finally {
      setState(() {
        _isLoading = false;
        _isLoadingMore = false;
      });
    }
  }

  void _loadMore() {
    if (_events.length >= _totalCount) return;
    setState(() {
      _page += 1;
    });
    _fetchLoginHistory(initial: false);
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;

    return Scaffold(
      appBar: AppBar(
        title: Text(loc.loginHistory),
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : RefreshIndicator(
              onRefresh: () async {
                _page = 1;
                await _fetchLoginHistory(initial: true);
              },
              child: ListView(
                padding: const EdgeInsets.all(16.0),
                children: [
                  if (_events.isEmpty)
                    Center(
                      child: Padding(
                        padding: const EdgeInsets.symmetric(vertical: 32.0),
                        child: Text(
                          loc.noLoginEvents,
                          style: Theme.of(context).textTheme.bodyLarge,
                        ),
                      ),
                    )
                  else
                    ..._events.map((event) => _LoginHistoryItem(event: event)),

                  if (_events.isNotEmpty && _events.length < _totalCount)
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 12.0),
                      child: Center(
                        child: ElevatedButton(
                          onPressed: _isLoadingMore ? null : _loadMore,
                          child: _isLoadingMore
                              ? const SizedBox(
                                  height: 18,
                                  width: 18,
                                  child: CircularProgressIndicator(strokeWidth: 2),
                                )
                              : Text(loc.loadMore),
                        ),
                      ),
                    ),
                ],
              ),
            ),
    );
  }
}

class _LoginHistoryItem extends StatelessWidget {
  final Map<String, dynamic> event;
  const _LoginHistoryItem({required this.event});

  String _formatDate(String? isoString) {
    if (isoString == null) return '';
    try {
      final dt = DateTime.parse(isoString);
      return '${dt.year}-${dt.month.toString().padLeft(2, '0')}-${dt.day.toString().padLeft(2, '0')} ${dt.hour.toString().padLeft(2, '0')}:${dt.minute.toString().padLeft(2, '0')}';
    } catch (_) {
      return isoString;
    }
  }

  @override
  Widget build(BuildContext context) {
    final createdAt = event['createdAt']?.toString();
    final deviceInfo = event['deviceInfo']?.toString();
    final userAgent = event['userAgent']?.toString();

    return Card(
      margin: const EdgeInsets.symmetric(vertical: 8.0),
      child: ListTile(
        leading: const Icon(Icons.history),
        title: Text(_formatDate(createdAt)),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (deviceInfo != null && deviceInfo.isNotEmpty)
              Text(deviceInfo),
            if (userAgent != null && userAgent.isNotEmpty)
              Text(
                userAgent,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
          ],
        ),
      ),
    );
  }
}