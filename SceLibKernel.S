.arch armv7−a
@ export functions
	.section .vitalink.fstubs,"ax",%progbits
	.align 2
@export sceKernelPuts
	.global sceKernelPuts
	.type sceKernelPuts, %function
sceKernelPuts:
	.word 0x49C42940
	.word 0xCAE9ACE6
	.word 0x23EAA62
	.align 4
@export sceKernelGetThreadId
	.global sceKernelGetThreadId
	.type sceKernelGetThreadId, %function
sceKernelGetThreadId:
	.word 0x49C42940
	.word 0xCAE9ACE6
	.word 0xFB972F9
	.align 4
@export sceIoDevctl
	.global sceIoDevctl
	.type sceIoDevctl, %function
sceIoDevctl:
	.word 0x49C42940
	.word 0xCAE9ACE6
	.word 0x4B30CB2
	.align 4
@ export variables
	.section .vitalink.vstubs,"awx",%progbits
	.align 2
@export SceKernelStackGuard
	.global SceKernelStackGuard
	.type SceKernelStackGuard, %object
SceKernelStackGuard:
	.word 0x49C42940
	.word 0xCAE9ACE6
	.word 0x4458BCF3
	.align 4
