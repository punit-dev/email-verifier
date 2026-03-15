# Email Verification Module (Node.js)

A Node.js module that verifies email addresses using **syntax validation, DNS MX lookup, and SMTP mailbox verification**.
It also detects common domain typos and suggests corrections using a **"Did You Mean?"** feature.

---

## Features

- Email syntax validation using regex
- DNS MX record lookup
- SMTP mailbox verification using `RCPT TO`
- "Did You Mean?" typo detection using Levenshtein distance
- Structured JSON response
- Error handling for connection issues and invalid inputs
- Unit tests using Jest

---

## Project Structure

```bash
email-verifier/
│
├── src/
│   ├── verifyEmail.js
│   ├── smtpCheck.js
│   ├── didYouMean.js
│   └── utils/
│       ├── validateEmail.js
│       └── mxLookup.js
│
├── tests/
│   └── verifyEmail.test.js
│
├── index.js
├── package.json
└── README.md
```

---

## Installation

Clone the repository and install dependencies.

```bash
git clone https://github.com/punit-dev/email-verifier.git
cd email-verifier
npm install
```

---

## Usage

Run the program using the entry file.

```bash
node index.js <email>
```

Example inside `index.js`:

```javascript
const verifyEmail = require("./src/verifyEmail");

const run = async (email) => {
  const result = await verifyEmail(email);
  console.log(result);
};

const email = process.argv[2];

run(email);
```

---

## Example Output

```json
{
  "email": "user@example.com",
  "result": "valid",
  "resultcode": 1,
  "subresult": "mailbox_exists",
  "domain": "example.com",
  "mxRecords": ["mx1.example.com", "mx2.example.com"],
  "executiontime": 1.3,
  "error": null,
  "timestamp": "2026-03-15T12:30:00.000Z"
}
```

---

## Result Codes

| Result  | Code |
| ------- | ---- |
| valid   | 1    |
| unknown | 3    |
| invalid | 6    |

---

## Did You Mean Feature

The module detects common domain typos and suggests corrections.

Example:

```
Input:  user@gmial.com
Output: user@gmail.com
```

The result will include:

```
subresult: "typo_detected"
```

---

## Running Tests

This project uses **Jest** for unit testing.

Run tests with:

```bash
npm test
```

Test coverage includes:

- Valid email syntax
- Invalid email formats
- Typo detection
- Empty and null inputs
- Edge cases
- SMTP response handling

Minimum **15+ test cases** are included.

---

## Limitations

Some large email providers (like Gmail) may return a successful SMTP response even for non-existent mailboxes.
In these cases the result may appear as **valid or unknown** because mailbox verification is restricted by the provider.

---

## Technologies Used

- Node.js
- DNS module (`dns.promises`)
- TCP networking (`net`)
- Jest (testing framework)
- Levenshtein distance algorithm
