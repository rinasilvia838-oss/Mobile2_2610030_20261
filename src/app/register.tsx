import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { authStyles } from "@/styles/authStyles";

export default function RegisterScreen() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [feedback, setFeedback] = useState<{
    title: string;
    message: string;
    type: "error" | "success";
  } | null>(null);

  const [focusedField, setFocusedField] = useState<
    "nama" | "email" | "password" | "confirm" | null
  >(null);

  // Fungsi untuk menangani proses pendaftaran
  const handleRegister = () => {
    if (
      !nama.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setFeedback({
        type: "error",
        title: "Pendaftaran Gagal",
        message: "Semua kolom formulir wajib diisi.",
      });
      return;
    }

    // Validasi panjang kata sandi
    if (password.length < 6) {
      setFeedback({
        type: "error",
        title: "Kata Sandi Lemah",
        message: "Kata sandi minimal terdiri dari 6 karakter.",
      });
      return;
    }

    // Validasi konfirmasi kata sandi
    if (password !== confirmPassword) {
      setFeedback({
        type: "error",
        title: "Tidak Cocok",
        message: "Konfirmasi kata sandi tidak sama dengan kata sandi.",
      });
      return;
    }

    setFeedback({
      type: "success",
      title: "Data pendaftaran valid",
      message: `Formulir ${nama.trim()} sudah lolos validasi. Pendaftaran masih dalam mode demo dan belum disimpan ke server.`,
    });
  };

  return (
    <SafeAreaView style={authStyles.safeArea}>
      <KeyboardAvoidingView
        style={authStyles.flexContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Tombol Kembali Kustom */}
          <TouchableOpacity
            style={authStyles.topBackButton}
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back"
              size={20}
              color="#0F172A"
            />
          </TouchableOpacity>

          {/* Header Registrasi */}
          <View style={authStyles.headerArea}>
            <View style={authStyles.logoBadge}>
              <Ionicons
                name="person-add"
                size={28}
                color="#2563EB"
              />
            </View>

            <Text style={authStyles.title}>
              Buat Akun Baru
            </Text>

            <Text style={authStyles.subtitle}>
              Lengkapi data diri Anda untuk mendaftarkan akun baru
            </Text>
          </View>

          {/* Kartu Formulir Registrasi */}
          <View style={authStyles.card}>
            {/* Nama Lengkap */}
            <View style={authStyles.formGroup}>
              <Text style={authStyles.label}>
                Nama Lengkap
              </Text>

              <View
                style={[
                  authStyles.inputWrapper,
                  focusedField === "nama" &&
                    authStyles.inputWrapperFocused,
                ]}
              >
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={
                    focusedField === "nama" ? "#2563EB" : "#64748B"
                  }
                  style={authStyles.inputIcon}
                />

                <TextInput
                  style={authStyles.input}
                  placeholder="Contoh: Muhammad Rizki"
                  placeholderTextColor="#94A3B8"
                  value={nama}
                  onChangeText={setNama}
                  onFocus={() => setFocusedField("nama")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            {/* Email */}
            <View style={authStyles.formGroup}>
              <Text style={authStyles.label}>
                Alamat Email
              </Text>

              <View
                style={[
                  authStyles.inputWrapper,
                  focusedField === "email" &&
                    authStyles.inputWrapperFocused,
                ]}
              >
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={
                    focusedField === "email" ? "#2563EB" : "#64748B"
                  }
                  style={authStyles.inputIcon}
                />

                <TextInput
                  style={authStyles.input}
                  placeholder="nama@kampus.ac.id"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            {/* Password */}
            <View style={authStyles.formGroup}>
              <Text style={authStyles.label}>
                Kata Sandi
              </Text>

              <View
                style={[
                  authStyles.inputWrapper,
                  focusedField === "password" &&
                    authStyles.inputWrapperFocused,
                ]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={
                    focusedField === "password"
                      ? "#2563EB"
                      : "#64748B"
                  }
                  style={authStyles.inputIcon}
                />

                <TextInput
                  style={authStyles.input}
                  placeholder="Minimal 6 karakter"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                />

                <TouchableOpacity
                  style={authStyles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={
                      showPassword
                        ? "eye-off-outline"
                        : "eye-outline"
                    }
                    size={20}
                    color="#64748B"
                  />
                </TouchableOpacity>
              </View>

              <Text style={authStyles.helperText}>
                Gunakan kombinasi huruf dan angka.
              </Text>
            </View>

            {/* Konfirmasi Password */}
            <View style={authStyles.formGroup}>
              <Text style={authStyles.label}>
                Konfirmasi Kata Sandi
              </Text>

              <View
                style={[
                  authStyles.inputWrapper,
                  focusedField === "confirm" &&
                    authStyles.inputWrapperFocused,
                ]}
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={20}
                  color={
                    focusedField === "confirm"
                      ? "#2563EB"
                      : "#64748B"
                  }
                  style={authStyles.inputIcon}
                />

                <TextInput
                  style={authStyles.input}
                  placeholder="Ulangi kata sandi"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showConfirm}
                  autoCapitalize="none"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  onFocus={() => setFocusedField("confirm")}
                  onBlur={() => setFocusedField(null)}
                />

                <TouchableOpacity
                  style={authStyles.eyeButton}
                  onPress={() => setShowConfirm(!showConfirm)}
                >
                  <Ionicons
                    name={
                      showConfirm
                        ? "eye-off-outline"
                        : "eye-outline"
                    }
                    size={20}
                    color="#64748B"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Tombol Daftar */}
            <TouchableOpacity
              style={authStyles.primaryButton}
              activeOpacity={0.85}
              onPress={handleRegister}
            >
              <Text style={authStyles.primaryButtonText}>
                Daftar Akun
              </Text>

              <Ionicons
                name="checkmark"
                size={19}
                color="#FFFFFF"
              />
            </TouchableOpacity>

            {feedback && (
              <View
                style={[
                  authStyles.feedback,
                  feedback.type === "error"
                    ? authStyles.feedbackError
                    : authStyles.feedbackSuccess,
                ]}
              >
                <Text style={authStyles.feedbackTitle}>
                  {feedback.title}
                </Text>
                <Text style={authStyles.feedbackMessage}>
                  {feedback.message}
                </Text>
                {feedback.type === "success" && (
                  <TouchableOpacity
                    style={authStyles.feedbackButton}
                    activeOpacity={0.85}
                    onPress={() => router.replace("/login")}
                  >
                    <Text style={authStyles.feedbackButtonText}>
                      Kembali ke Login
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* Navigasi Login */}
            <View
              style={[
                authStyles.footerRow,
                { marginTop: 18 },
              ]}
            >
              <Text style={authStyles.footerText}>
                Sudah memiliki akun?
              </Text>

              <TouchableOpacity onPress={() => router.back()}>
                <Text style={authStyles.footerLink}>
                  Masuk di sini
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}