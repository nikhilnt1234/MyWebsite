# 🧪 MANUAL TESTING SCRIPT
## Step-by-Step Testing Guide Before Publishing

**Time Required**: ~15 minutes  
**Browser**: Chrome (recommended), Safari, Firefox

---

## 🎯 QUICK START

1. **Start Dev Server**:
   ```bash
   cd /Users/nehanikhil/Desktop/MyWebsite_Git
   npm run dev
   ```

2. **Open Browser**: http://localhost:3000

3. **Follow Tests Below** ⬇️

---

## ✅ TEST 1: Hero Section & Featured Work

### **What to Test**: YouTube thumbnails, social links, hackathon card

**Steps**:
1. ✅ Verify page loads quickly (< 2 seconds)
2. ✅ See hackathon card with trophy icon (amber gradient)
3. ✅ See "Connect" section with Email/Phone/LinkedIn buttons
4. ✅ Click Email button → Opens mailto link
5. ✅ Click Phone button → Opens tel link
6. ✅ Click LinkedIn button → Opens LinkedIn in new tab
7. ✅ Scroll to "Featured Work" section
8. ✅ **VERIFY**: YouTube videos show thumbnails (not just text)
9. ✅ Hover over YouTube card → Thumbnail scales up slightly
10. ✅ Click YouTube card → Opens video in new tab
11. ✅ Click Gemini App card → Opens demo in new tab
12. ✅ Click Substack card → Opens article in new tab

**Expected Results**:
- ✅ All 5 Featured Work cards display
- ✅ 2 YouTube cards have video thumbnails
- ✅ 3 other cards have text-only layout
- ✅ All links open in new tabs

---

## ✅ TEST 2: Command Palette (⌘K)

### **What to Test**: Keyboard shortcuts, navigation

**Steps**:
1. ✅ Press `⌘K` (Mac) or `Ctrl+K` (Windows)
2. ✅ Verify palette opens with 6 actions
3. ✅ Press `Arrow Down` → Highlights next action
4. ✅ Press `Arrow Up` → Highlights previous action
5. ✅ Press `Enter` on "Go to Case Studies" → Scrolls smoothly
6. ✅ Press `⌘K` again → Palette opens
7. ✅ Click "Go to AI Lab" → Scrolls to AI Lab section
8. ✅ Press `⌘K` again → Palette opens
9. ✅ Click "Copy Recruiter Summary" → Copies to clipboard
10. ✅ Paste in text editor → Verify summary copied
11. ✅ Press `ESC` → Palette closes

**Expected Results**:
- ✅ Keyboard shortcuts work
- ✅ Smooth scroll to sections
- ✅ Clipboard copy works
- ✅ ESC closes palette

---

## ✅ TEST 3: AI Chat (OpenAI Integration)

### **What to Test**: Chat functionality, OpenAI responses

**Steps**:
1. ✅ Scroll to "AI Lab" section
2. ✅ Click "Ask Questions" button
3. ✅ Verify modal opens with welcome message
4. ✅ Read welcome message: "👋 Hi! I'm an AI assistant..."
5. ✅ Verify 5 quick chips display at top
6. ✅ Click "Profile Overview" chip
7. ✅ Wait 2-5 seconds for response
8. ✅ **VERIFY**: Response is structured (answer + bullets + follow-ups)
9. ✅ **VERIFY**: Response is NOT a data dump (no raw URLs/emails)
10. ✅ **VERIFY**: Response highlights interview-worthiness
11. ✅ Click a source link → Scrolls to that section
12. ✅ Click a follow-up question → Sends new query
13. ✅ Type custom question: "How do you approach production AI?"
14. ✅ Click Send → Wait for response
15. ✅ **VERIFY**: Response shows technical depth + real examples
16. ✅ Click "Contact Me" chip
17. ✅ **VERIFY**: Contact card displays with email/phone/LinkedIn
18. ✅ **VERIFY**: Public links section shows all 5 links
19. ✅ Click email in contact card → Opens mailto
20. ✅ Click copy button → Copies response to clipboard

**Expected Results**:
- ✅ All responses are structured (not data dumps)
- ✅ Responses are interview-focused and compelling
- ✅ Contact card displays properly
- ✅ Sources and follow-ups work
- ✅ No errors in browser console

**If Chat Fails**:
- Check browser console for errors
- Verify OpenAI API key is set in `.env`
- Check dev server logs for API errors

---

## ✅ TEST 4: Case Studies Section

### **What to Test**: Horizontal scroll, expandable details

**Steps**:
1. ✅ Scroll to "Case Studies" section
2. ✅ Verify horizontal scroll works (mouse or trackpad)
3. ✅ Click on "Digital Wallet" card
4. ✅ Verify card expands with details
5. ✅ Read: What I owned → Constraints → Decisions → Outcomes
6. ✅ Verify tags display (iOS, Payment Flows, Error Design)
7. ✅ Click card again → Collapses
8. ✅ Scroll to next case study
9. ✅ Repeat for "SmartMarkdown" and "Refund Engine"

**Expected Results**:
- ✅ Smooth horizontal scroll
- ✅ Cards expand/collapse smoothly
- ✅ Content is well-structured and readable

---

## ✅ TEST 5: Contact Section

### **What to Test**: Contact cards, YouTube thumbnails

**Steps**:
1. ✅ Scroll to "Contact" section (bottom of page)
2. ✅ Verify 3 contact cards display (Email, Phone, LinkedIn)
3. ✅ Click email → Opens mailto
4. ✅ Click phone → Opens tel
5. ✅ Click LinkedIn → Opens in new tab
6. ✅ Scroll to "Public Work & Demos"
7. ✅ **VERIFY**: YouTube videos show thumbnails
8. ✅ Hover over YouTube card → Thumbnail scales up
9. ✅ Click YouTube card → Opens video in new tab
10. ✅ Verify recruiter summary displays at bottom

**Expected Results**:
- ✅ All contact methods work
- ✅ YouTube thumbnails display
- ✅ All links open correctly

---

## ✅ TEST 6: Dark Mode

### **What to Test**: Theme toggle

**Steps**:
1. ✅ Look for theme toggle button (sidebar on desktop, header on mobile)
2. ✅ Click toggle → Theme switches to dark
3. ✅ Verify all sections look good in dark mode
4. ✅ Click toggle again → Theme switches to light
5. ✅ Refresh page → Verify theme persists (localStorage)

**Expected Results**:
- ✅ Smooth theme transition
- ✅ All colors readable in both modes
- ✅ Theme persists after refresh

---

## ✅ TEST 7: Mobile Responsiveness

### **What to Test**: Mobile layout, touch interactions

**Steps**:
1. ✅ Open Chrome DevTools (F12)
2. ✅ Click "Toggle device toolbar" (⌘⇧M)
3. ✅ Select "iPhone 14 Pro" or "Pixel 7"
4. ✅ Verify sticky header displays at top
5. ✅ Verify navigation links in header
6. ✅ Scroll through page → Verify smooth scroll
7. ✅ Tap Featured Work cards → Opens in new tab
8. ✅ Tap "Ask Questions" → Modal opens full-screen
9. ✅ Type query → Get response
10. ✅ Verify contact card displays properly on mobile
11. ✅ Verify YouTube thumbnails display on mobile
12. ✅ Test on tablet size (iPad)
13. ✅ Verify 2-column layout for Featured Work

**Expected Results**:
- ✅ All content readable on mobile
- ✅ Touch targets large enough (44x44px minimum)
- ✅ No horizontal scroll (except case studies)
- ✅ Images load properly

---

## ✅ TEST 8: Performance

### **What to Test**: Load times, animations

**Steps**:
1. ✅ Open Chrome DevTools → Network tab
2. ✅ Refresh page (⌘R)
3. ✅ Verify page loads in < 2 seconds
4. ✅ Check total size < 200 KB (excluding images)
5. ✅ Verify YouTube thumbnails load
6. ✅ Scroll through page → Verify smooth animations
7. ✅ Open chat → Verify modal animates smoothly
8. ✅ Type query → Verify response appears in < 5 seconds

**Expected Results**:
- ✅ Fast initial load
- ✅ Smooth animations (60fps)
- ✅ No layout shift
- ✅ Images load progressively

---

## ✅ TEST 9: Accessibility

### **What to Test**: Keyboard navigation, screen readers

**Steps**:
1. ✅ Close mouse/trackpad (keyboard only)
2. ✅ Press `Tab` → Verify focus moves logically
3. ✅ Verify focus states visible (blue outline)
4. ✅ Tab to Email button → Press `Enter` → Opens mailto
5. ✅ Tab to Featured Work card → Press `Enter` → Opens link
6. ✅ Press `⌘K` → Palette opens
7. ✅ Arrow keys → Navigate actions
8. ✅ Press `Enter` → Executes action
9. ✅ Press `ESC` → Closes palette
10. ✅ Tab to "Ask Questions" → Press `Enter` → Opens chat
11. ✅ Tab through chat → Verify focus order logical
12. ✅ Press `ESC` → Closes chat

**Expected Results**:
- ✅ All interactive elements accessible via keyboard
- ✅ Focus states clearly visible
- ✅ Logical tab order
- ✅ ESC closes modals

---

## ✅ TEST 10: Error Handling

### **What to Test**: Graceful failures

**Steps**:
1. ✅ Open chat modal
2. ✅ Turn off WiFi (simulate network failure)
3. ✅ Type query and send
4. ✅ Verify error message displays: "Service unavailable. Retry."
5. ✅ Verify "Retry" button appears
6. ✅ Turn WiFi back on
7. ✅ Click "Retry" → Response should work
8. ✅ Test with invalid query (gibberish)
9. ✅ Verify helpful response (not crash)

**Expected Results**:
- ✅ No crashes
- ✅ Clear error messages
- ✅ Retry functionality works
- ✅ Graceful degradation

---

## 🎯 PASS/FAIL CRITERIA

### **PASS** ✅ if:
- All 10 tests complete without critical issues
- YouTube thumbnails display correctly
- Chat returns structured responses (not data dumps)
- Command palette works with ⌘K
- All links open correctly
- Mobile layout works properly
- No console errors

### **FAIL** ❌ if:
- YouTube thumbnails don't display
- Chat returns data dumps or crashes
- Command palette doesn't open
- Links broken
- Mobile layout broken
- Console shows errors

---

## 🐛 COMMON ISSUES & FIXES

### **Issue**: YouTube thumbnails don't display
**Fix**: 
1. Check `next.config.mjs` has `remotePatterns` for `i.ytimg.com`
2. Restart dev server: `npm run dev`
3. Clear browser cache

### **Issue**: Chat returns data dumps
**Fix**:
1. Check `.env` has correct OpenAI API key
2. Verify `PORTFOLIO_LLM_PROVIDER=openai`
3. Restart dev server

### **Issue**: Command palette doesn't open
**Fix**:
1. Check browser console for errors
2. Try `Ctrl+K` instead of `⌘K` (Windows)
3. Refresh page

### **Issue**: Links don't open
**Fix**:
1. Check `lib/data.ts` has correct URLs
2. Verify `target="_blank"` on external links
3. Check browser pop-up blocker

---

## ✅ FINAL CHECKLIST

After completing all tests:

- [ ] All 10 tests passed
- [ ] YouTube thumbnails display
- [ ] Chat works with OpenAI
- [ ] Command palette works
- [ ] All links work
- [ ] Mobile layout works
- [ ] Dark mode works
- [ ] No console errors
- [ ] Performance acceptable (< 2s load)
- [ ] Accessibility good (keyboard nav works)

**If all checked**: 🚀 **READY TO DEPLOY!**

---

## 📞 NEED HELP?

1. Check browser console (F12) for errors
2. Check dev server logs
3. Verify `.env` file has correct values
4. Review `PRODUCTION_REVIEW.md` for detailed info
5. Test on different browser (Chrome vs Safari)

---

**Last Updated**: March 3, 2026  
**Estimated Time**: 15 minutes  
**Difficulty**: Easy
