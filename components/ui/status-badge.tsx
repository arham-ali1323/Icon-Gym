"use client";

import React from 'react';
import { cn } from "@/lib/utils";
import { CheckCircle, AlertCircle, Clock, TrendingUp, TrendingDown } from 'lucide-react';

export interface StatusBadgeProps {
  status: 'success' | 'warning' | 'error' | 'pending' | 'up' | 'down';
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  icon?: boolean;
}

export function StatusBadge({ 
  status, 
  children, 
  variant = 'default', 
  size = 'md',
  icon = true 
}: StatusBadgeProps) {
  const statusConfig = {
    success: {
      bgColor: variant === 'subtle' ? 'bg-green-500/10' : variant === 'outline' ? 'bg-transparent' : 'bg-green-500',
      textColor: variant === 'outline' ? 'text-green-500' : 'text-white',
      borderColor: variant === 'outline' ? 'border-green-500' : 'border-transparent',
      icon: CheckCircle,
      iconColor: variant === 'subtle' ? 'text-green-500' : 'text-white'
    },
    warning: {
      bgColor: variant === 'subtle' ? 'bg-yellow-500/10' : variant === 'outline' ? 'bg-transparent' : 'bg-yellow-500',
      textColor: variant === 'outline' ? 'text-yellow-500' : 'text-white',
      borderColor: variant === 'outline' ? 'border-yellow-500' : 'border-transparent',
      icon: AlertCircle,
      iconColor: variant === 'subtle' ? 'text-yellow-500' : 'text-white'
    },
    error: {
      bgColor: variant === 'subtle' ? 'bg-red-500/10' : variant === 'outline' ? 'bg-transparent' : 'bg-red-500',
      textColor: variant === 'outline' ? 'text-red-500' : 'text-white',
      borderColor: variant === 'outline' ? 'border-red-500' : 'border-transparent',
      icon: AlertCircle,
      iconColor: variant === 'subtle' ? 'text-red-500' : 'text-white'
    },
    pending: {
      bgColor: variant === 'subtle' ? 'bg-blue-500/10' : variant === 'outline' ? 'bg-transparent' : 'bg-blue-500',
      textColor: variant === 'outline' ? 'text-blue-500' : 'text-white',
      borderColor: variant === 'outline' ? 'border-blue-500' : 'border-transparent',
      icon: Clock,
      iconColor: variant === 'subtle' ? 'text-blue-500' : 'text-white'
    },
    up: {
      bgColor: variant === 'subtle' ? 'bg-green-500/10' : variant === 'outline' ? 'bg-transparent' : 'bg-green-500',
      textColor: variant === 'outline' ? 'text-green-500' : 'text-white',
      borderColor: variant === 'outline' ? 'border-green-500' : 'border-transparent',
      icon: TrendingUp,
      iconColor: variant === 'subtle' ? 'text-green-500' : 'text-white'
    },
    down: {
      bgColor: variant === 'subtle' ? 'bg-red-500/10' : variant === 'outline' ? 'bg-transparent' : 'bg-red-500',
      textColor: variant === 'outline' ? 'text-red-500' : 'text-white',
      borderColor: variant === 'outline' ? 'border-red-500' : 'border-transparent',
      icon: TrendingDown,
      iconColor: variant === 'subtle' ? 'text-red-500' : 'text-white'
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium transition-all duration-200",
        config.bgColor,
        config.textColor,
        config.borderColor,
        variant === 'outline' && 'border',
        sizeClasses[size]
      )}
    >
      {icon && <Icon className={cn("w-3 h-3", config.iconColor)} />}
      {children}
    </span>
  );
}
