import 'package:flutter/material.dart';
import './login_page/buttons.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'AutoBox',
        home: Scaffold(
          body: ListView(children: [
            Center(
              heightFactor: 5.5,
              child: Image.asset('assets/images/logo-vertical.png'),
            ),
          ]),
        ));
  }
}
