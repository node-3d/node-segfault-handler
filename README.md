# Segfault handler for Node.js

This is a part of [Node3D](https://github.com/node-3d) project.

[![NPM](https://badge.fury.io/js/segfault-raub.svg)](https://badge.fury.io/js/segfault-raub)
[![CodeFactor](https://www.codefactor.io/repository/github/node-3d/segfault-raub/badge)](https://www.codefactor.io/repository/github/node-3d/segfault-raub)

```
npm i segfault-raub
```

This module does nothing (zero perf impact) as long as Node is well-behaved.
If a **SIGSEGV** signal is raised, the module will print a native stack trace to both
**STDERR** and to the "**segfault.log**" file (if exists). If there is no such file, it
**won't be created**, so it is up to you if the log-file is needed.

> Note: this **addon uses N-API**, and therefore is ABI-compatible across different
Node.js versions. Addon binaries are precompiled and **there is no compilation**
step during the `npm i` command.


## Usage

Just require the module and that's it. You may require it as many times you want,
but the **SIGSEGV** hook will only be set once. There are no calls required, and
no options.

```javascript
require('segfault-raub');
```

> Note: The very first imported instance of this module is assigned to `global['segfault-raub']`.
Hence if your project tree may contain multiple versions of this module, they are still going
to work as a single one. All the extra instances will re-export the value from
`global['segfault-raub']` if it exists (and won't auto-register their own SEGFAULT callbacks).


## causeSegfault

Calling this method will cause a SEGFAULT (accessing the `0x01` pointer). This may be helpful
to see how SEGFAULTs are reported and if the log files are being written properly.

```javascript
const { causeSegfault } = require('segfault-raub');
causeSegfault();
```


## Windows Signals

| Signal                   | Enabled | Description                                        |
| :---                     | :---:   | :---                                               |
| ACCESS_VIOLATION         | yes     | Memory access was denied.                          |
| ARRAY_BOUNDS_EXCEEDED    | yes     | Array was accessed with an illegal index.          |
| INT_DIVIDE_BY_ZERO       | yes     | Attempt to divide by an integer divisor of 0.      |
| ILLEGAL_INSTRUCTION      | yes     | Attempt to execute an illegal instruction.         |
| NONCONTINUABLE_EXCEPTION | yes     | Can't continue after an exception.                 |
| STACK_OVERFLOW           | yes     | The thread used up its stack.                      |
| INVALID_HANDLE           | yes     | An invalid handle was specified.                   |
| FLT_DIVIDE_BY_ZERO       | no      | Attempt to divide by a float divisor of 0.f.       |
| DATATYPE_MISALIGNMENT    | no      | A datatype misalignment was detected.              |
| BREAKPOINT               | no      | A Breakpoint has been reached.                     |
| SINGLE_STEP              | no      | Continue single-stepping execution.                |
| FLT_DENORMAL_OPERAND     | no      | One of the operands is denormal.                   |
| FLT_INEXACT_RESULT       | no      | The result cannot be represented exactly.          |
| FLT_INVALID_OPERATION    | no      | Floating-point invalid operation.                  |
| FLT_OVERFLOW             | no      | The exponent of operation is too large.            |
| FLT_STACK_CHECK          | no      | The Stack gone bad after a float operation.        |
| FLT_UNDERFLOW            | no      | The exponent of operation is too low.              |
| INT_OVERFLOW             | no      | The result of operation is too large.              |
| PRIV_INSTRUCTION         | no      | Operation is not allowed in current mode.          |
| IN_PAGE_ERROR            | no      | Can't access a memory page.                        |
| INVALID_DISPOSITION      | no      | Invalid disposition returned.                      |
| GUARD_PAGE               | no      | Accessing PAGE_GUARD-allocated modifier.           |
| POSSIBLE_DEADLOCK        | no      | Wait on a critical section times out.              |


## Unix Signals

| Signal     | Handling | Enabled | Description                                        |
| :---       | :---:    | :---:   | :---                                               |
| SIGABRT    |    A     | yes     | Process abort signal.                              |
| SIGFPE     |    A     | yes     | Erroneous arithmetic operation.                    |
| SIGSEGV    |    A     | yes     | Invalid memory reference.                          |
| SIGILL     |    A     | yes     | Illegal instruction.                               |
| SIGBUS     |    A     | yes     | Access to an undefined portion of a memory object. |
| SIGTERM    |    T     | no      | Termination signal.                                |
| SIGINT     |    T     | no      | Terminal interrupt signal.                         |
| SIGALRM    |    T     | no      | Alarm clock.                                       |
| SIGCHLD    |    I     | no      | Child process terminated, stopped, or continued.   |
| SIGCONT    |    C     | no      | Continue executing, if stopped.                    |
| SIGHUP     |    T     | no      | Hangup.                                            |
| SIGKILL    |    T     | no      | Kill (cannot be caught or ignored).                |
| SIGPIPE    |    T     | no      | Write on a pipe with no one to read it.            |
| SIGQUIT    |    A     | no      | Terminal quit signal.                              |
| SIGSTOP    |    S     | no      | Stop executing (cannot be caught or ignored).      |
| SIGTSTP    |    S     | no      | Terminal stop signal.                              |
| SIGTTIN    |    S     | no      | Background process attempting read.                |
| SIGTTOU    |    S     | no      | Background process attempting write.               |
| SIGUSR1    |    T     | no      | User-defined signal 1.                             |
| SIGUSR2    |    T     | no      | User-defined signal 2.                             |
| SIGPROF    |    T     | no      | Profiling timer expired.                           |
| SIGSYS     |    A     | no      | Bad system call.                                   |
| SIGTRAP    |    A     | no      | Trace/breakpoint trap.                             |
| SIGURG     |    I     | no      | High bandwidth data is available at a socket.      |
| SIGVTALRM  |    T     | no      | Virtual timer expired.                             |
| SIGXCPU    |    A     | no      | CPU time limit exceeded.                           |
| SIGXFSZ    |    A     | no      | File size limit exceeded.                          |

* `T` - Abnormal termination of the process.
* `A` - Abnormal termination of the process with additional actions.
* `I` - Ignore the signal.
* `S` - Stop the process.
* `C` - Continue the process, if it is stopped; otherwise, ignore the signal.


## Legal notice

This package is derived from [segfault-handler](https://github.com/ddopson/node-segfault-handler).
The original licensing rules apply, see `LICENSE_node-segfault-handler`.

Also this project uses [callstack walker](https://github.com/JochenKalmbach/StackWalker)
which is licensed under BSD-2 Clause.

The rest of this package (the newly introduced files) is licensed under MIT.
