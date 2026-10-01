# IT3060 - HCI | Lab Exercise 06 - Report
# Technology Deployment and App Release

**Name:** DINUJA A.A.K  
**Student ID:** IT23674394  
**Batch / Group:** Y3.S2.WE.IT.0302  
**Date:** October 1, 2026  

**Case Study:** FitFlow Redesign

---

## Activity 1: Generate Signed APK/AAB

### Build Configuration

The FitFlow Android release build was configured using **Expo Application Services (EAS) Build**, which manages signing, versioning, and optimization in the cloud.

**Application identity:**
- Package name: `com.sliit.fitflow`
- Version name: `1.1.0`
- Version code: `2` (incremented from initial `1`)
- Expo SDK: 57.0.0

**Release configuration (eas.json):**
```json
{
  "cli": { "version": ">= 24.8.0", "appVersionSource": "local" },
  "build": {
    "preview": {
      "distribution": "internal",
      "android": { "buildType": "apk" }
    },
    "production": {
      "android": { "buildType": "app-bundle" }
    }
  }
}
```

**Minification and optimization (app.json):**
```json
"plugins": [
  ["expo-build-properties", {
    "android": {
      "enableMinifyInReleaseBuilds": true,
      "enableShrinkResourcesInReleaseBuilds": true
    }
  }]
]
```

### Build Commands

```bash
# APK (for device testing)
eas build --platform android --profile preview

# AAB (for Google Play)
eas build --platform android --profile production
```

### Build Results

| Build | Type | Status | Build Time |
|---|---|---|---|
| Preview | APK | ✅ Succeeded | 13m 56s |
| Production | AAB | ✅ Succeeded | 7m 0s |

**Build URLs:**
- APK: https://expo.dev/accounts/kalanad/projects/fitflow-redesign/builds/fa1e5d4f-a227-4c50-b166-bea6dc6bb497
- AAB: https://expo.dev/accounts/kalanad/projects/fitflow-redesign/builds/78b5bfbc-9d54-454c-9c62-9c235d591ab1

### Keystore Management

- **Signing method:** EAS-managed Android keystore (Expo server)
- **Keystore credential ID:** `L_osEcn0t3`
- **Private key storage:** EAS secure servers (never in Git)
- **Reproducibility:** future builds reuse the same keystore

### Verification

The signed APK was installed on an Android emulator (Medium Phone API 36.0). FitFlow launched successfully and all five screens rendered correctly.

---

## Activity 2: Prepare App Icons, Screenshots and Store Assets

### App Icons

Adaptive icons configured in app.json with background color `#0F766E`.

### Store Screenshots (5)

| File | Screen |
|---|---|
| 01-home.png | Home Dashboard |
| 02-plan.png | Workout Planner |
| 03-progress.png | Progress Tracking |
| 04-feed.png | Community Feed |
| 05-food.png | Nutrition Logger |

Screenshots saved in both `google-play/screenshots/` and `app-store/screenshots/`.

### Store Descriptions

- **Short (80 chars):** AI workouts, camera meal logging, and private community for fitness.
- **Full:** 5 feature bullets covering AI Daily Flow, Planner, Progress, Community, Nutrition
- **Category:** Health & Fitness
- **Price:** Free

---

## Activity 3: Configure Google Play Console

### Documented Process

Because a real Google Play Developer account ($25 one-time fee) is not required for this academic exercise, the process is documented rather than executed.

**Steps documented:**
1. Create app: FitFlow, Category Health & Fitness, Free
2. Fill store listing: descriptions, screenshots, icon, feature graphic
3. Complete content rating questionnaire (Utility/Fitness)
4. Upload signed AAB to Internal Testing track
5. Enable Google Play App Signing
6. Configure distribution: all countries, free, age 12+
7. Review pre-launch report

**Limitation:** Actual Play Console configuration was not performed. The documented workflow reflects current Google Play requirements.

---

## Activity 4: Configure App Store Connect and TestFlight

### Documented Process

Because an Apple Developer Program membership ($99/year) and macOS/Xcode environment are not available for this academic exercise, the process is documented.

**Steps documented:**
1. Create app record: FitFlow, bundle ID `com.sliit.fitflow`
2. Fill metadata: subtitle, keywords, description, privacy URL
3. Privacy nutrition labels: contact info, fitness data, user content
4. Upload iOS build via EAS Submit
5. Configure TestFlight: internal and external testers
6. Prepare iPhone and iPad screenshots

**Limitation:** Actual App Store Connect and TestFlight configuration was not performed. The workflow reflects current Apple requirements.

---

## Activity 5: Prepare a Privacy Policy and Release Notes

### Privacy Policy

**Public URL:** https://docs.google.com/document/d/1W1-LgcwsXHs1pVf01qA100d5T2kVPphYFxCjPQJR7W0/view

**Sections covered:**
1. Introduction
2. Information We Collect
3. How We Use Your Data
4. AI Processing (mock data disclaimer)
5. Data Storage (local only)
6. Data Sharing
7. Your Rights
8. Data Deletion
9. GDPR / CCPA Compliance
10. Health Data Disclaimer
11. Children's Privacy
12. Updates
13. Contact

### Release Notes

```
FitFlow 1.1.0 — Release Notes

New Features
- AI Daily Flow personalized workout recommendation
- Workout Planner with AI Suggested / Custom toggle
- Active Workout tracking
- Weekly Progress with streak heatmap and achievements
- Community Feed with private circles
- Nutrition Logger with camera-based entry

Improvements
- Modern high-fidelity UI matching Lab 03 wireframes
- Teal accent color scheme (#0F766E)
- Accessible touch targets

Known Limitations
- AI recommendations use mock data
- Food recognition is simulated
- Backend not yet integrated
- Data resets on app reload

Disclaimer: FitFlow is not a medical device.

Support: fitflow@example.com
```

---

## Activity 6: Perform Internal Testing Deployment

### Test Plan

The signed APK was deployed to an Android emulator and tested.

| Test ID | Screen | Test | Result |
|---|---|---|---|
| T01 | Home | Dashboard renders | ✅ Pass |
| T02 | Home | AI Daily Flow card displays | ✅ Pass |
| T03 | Home | Start Flow navigates to Plan | ✅ Pass |
| T04 | Plan | AI Suggested plan with 4 exercises | ✅ Pass |
| T05 | Plan | Toggle AI / Custom | ✅ Pass |
| T06 | Plan | Start Workout opens Active Workout | ✅ Pass |
| T07 | Plan | Complete Workout returns | ✅ Pass |
| T08 | Progress | Weekly view with trend chart | ✅ Pass |
| T09 | Progress | Toggle Weekly / Monthly | ✅ Pass |
| T10 | Progress | Streak heatmap renders | ✅ Pass |
| T11 | Feed | Community posts display | ✅ Pass |
| T12 | Feed | Compose post works | ✅ Pass |
| T13 | Feed | Comment screen works | ✅ Pass |
| T14 | Food | Nutrition log loads | ✅ Pass |
| T15 | Food | Sample recognition adds meal | ✅ Pass |
| T16 | Food | Edit meal flow works | ✅ Pass |
| T17 | Navigation | All 5 tabs switch | ✅ Pass |
| T18 | General | No crashes during session | ✅ Pass |

### Test Environment

- Device: Medium Phone API 36.0 (Android emulator)
- OS: Android API 36
- Build: Preview APK from EAS Build

### Issues Identified

No critical or major bugs found. Minor observations:
- O01: Data resets on reload (expected for prototype)
- O02: AI uses mock data (expected)
- O03: Camera uses placeholder in emulator (expected)

### Final Approval

The internal testing cycle confirmed that FitFlow functions correctly for its intended purpose. Approved for academic submission.

---

## Summary

| Activity | Status |
|---|---|
| 1 — Signed APK/AAB | ✅ Complete |
| 2 — Store assets | ✅ Complete |
| 3 — Google Play Console | ✅ Documented |
| 4 — App Store Connect | ✅ Documented |
| 5 — Privacy policy + Release notes | ✅ Complete |
| 6 — Internal testing | ✅ Complete |

**Repository:** https://github.com/kalanadinuja/fitflow-redesign

**Privacy policy:** https://docs.google.com/document/d/1W1-LgcwsXHs1pVf01qA100d5T2kVPphYFxCjPQJR7W0/view